import { NextResponse } from "next/server";
import pool from "@/lib/db"; 
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [jobs] = await pool.query<RowDataPacket[]>(
      `SELECT jobs_id, company_id, company_name, title, description, location, salary, city, requirements, posted_days_ago 
       FROM jobs`
    );

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
