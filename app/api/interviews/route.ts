import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [interviews] = await pool.query<RowDataPacket[]>(
      `SELECT interview_id, my_application_id, applicantName, jobTitle, date, time, mode, status
       FROM interview`
    );

    return NextResponse.json(interviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json({ error: "Failed to fetch interviews" }, { status: 500 });
  }
}
