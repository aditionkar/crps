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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      my_application_id, 
      applicantName, 
      jobTitle, 
      date, 
      time, 
      formattedDate, 
      formattedTime, 
      mode = "Online", 
      status = "Scheduled" 
    } = body;
    
    if (!my_application_id || !applicantName || !jobTitle || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO interview (my_application_id, applicantName, jobTitle, date, time, formatted_date, formatted_time, mode, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [my_application_id, applicantName, jobTitle, date, time, formattedDate || date, formattedTime || time, mode, status]
    );

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    return NextResponse.json(
      { error: "Failed to schedule interview: " + (error as Error).message },
      { status: 500 }
    );
  }
}