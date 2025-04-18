import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [applicants] = await pool.query<RowDataPacket[]>(
      `SELECT mock_applicant_id, name, email, jobTitle, resumeLink FROM mock_applicants`
    );

    return NextResponse.json(applicants, { status: 200 });
  } catch (error) {
    console.error("Error fetching mock applicants:", error);
    return NextResponse.json({ error: "Failed to fetch mock applicants" }, { status: 500 });
  }
}
