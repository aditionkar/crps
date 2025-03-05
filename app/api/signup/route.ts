import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse JSON data from request
        const body = await req.json();
        console.log("Received Data:", body);

        const { name, email, password, phone, resume_link, type, industry, website } = body;

        // Validate required fields
        if (!name || !email || !password || !type) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let query: string;
        let values: (string | number | null)[];

        if (type === "student") {
            if (!phone) return NextResponse.json({ success: false, message: "Phone is required for students" }, { status: 400 });

            query = `INSERT INTO students (name, email, password, phone, resume_link) VALUES (?, ?, ?, ?, ?)`;
            values = [name, email, hashedPassword, phone, resume_link || null];
        } else if (type === "company") {
            if (!industry || !website) return NextResponse.json({ success: false, message: "Industry and website are required for companies" }, { status: 400 });

            query = `INSERT INTO companies (name, email, password, industry, website) VALUES (?, ?, ?, ?, ?)`;
            values = [name, email, hashedPassword, industry, website];
        } else {
            return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
        }

        // Execute query and type the result properly
        const [result]: any = await pool.execute(query, values);

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            id: (result as { insertId?: number })?.insertId || null, // Fix insertId typing
        });

    } catch (error: unknown) {
        console.error("Sign-up Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error"; // Fix error.message typing
        return NextResponse.json({ success: false, message: "Internal Server Error", error: errorMessage }, { status: 500 });
    }
}
