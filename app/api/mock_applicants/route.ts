//api/mock_applicants/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

// Update your api/mock_applicants/route.ts
export async function GET() {
  try {
    const [applicants] = await pool.query<RowDataPacket[]>(
      `SELECT mock_applicant_id, name, email, jobTitle, resumeLink, student_id, job_id 
       FROM mock_applicants`
    );

    return NextResponse.json(applicants, { status: 200 });
  } catch (error) {
    console.error("Error fetching mock applicants:", error);
    return NextResponse.json({ error: "Failed to fetch mock applicants" }, { status: 500 });
  }
}

// DELETE method to remove a specific applicant
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicantId = searchParams.get('applicantId');
    
    if (!applicantId) {
      return NextResponse.json({ error: "Applicant ID is required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "DELETE FROM mock_applicants WHERE mock_applicant_id = ?",
      [applicantId]
    );

    return NextResponse.json({ message: "Applicant removed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting mock applicant:", error);
    return NextResponse.json({ error: "Failed to delete mock applicant" }, { status: 500 });
  }
}