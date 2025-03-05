import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const [rows] = await pool.query("SHOW TABLES;");
        return NextResponse.json({ success: true, tables: rows });
    } catch (error: any) {
        console.error("Database Error:", error);
        return NextResponse.json({ success: false, error: error?.message || "Unknown error" }, { status: 500 });
    }
}
