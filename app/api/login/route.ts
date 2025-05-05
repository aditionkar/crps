// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const { email, password, type } = JSON.parse(body);

        if (!email || !password || !type) {
            return NextResponse.json(
                { success: false, message: "Missing email, password, or type" },
                { status: 400 }
            );
        }

        // Ensure type is standardized 
        const userType = type === "recruiter" ? "company" : type;

        let query = userType === "student"
            ? `SELECT * FROM students WHERE email = ?`
            : `SELECT * FROM companies WHERE email = ?`;

        const [rows]: any = await pool.query(query, [email]);

        if (rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "Incorrect email or password" },
                { status: 401 }
            );
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: "Incorrect email or password" },
                { status: 401 }
            );
        }

        // Create a session token
        const userId = userType === "student" ? user.student_id : user.company_id;
        const userName = user.name;
        
        const token = await createSession({
            userId,
            userType, // This will be "student" or "company"
            email: user.email,
            name: userName
        });

        // Create the response object first
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            redirectTo: userType === "student" ? "/student" : "/recruiter",
        });
        
        // Then set the cookie on the response
        response.cookies.set({
            name: "session",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;

    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}