import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

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

        let query = type === "student" 
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

        return NextResponse.json({
            success: true,
            message: "Login successful",
            redirectTo: type === "student" ? "/student" : "/recruiter",
        });

    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
