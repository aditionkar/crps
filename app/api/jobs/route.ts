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

export async function POST(request: Request) {
  try {
    const job = await request.json();
    
    job.posted_days_ago = 0;
    
    const [result] = await pool.query(
      `INSERT INTO jobs (company_name, title, description, location, salary, city, requirements, posted_days_ago) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [job.company_name, job.title, job.description, job.location, job.salary, job.city, job.requirements, job.posted_days_ago]
    );
    
    return NextResponse.json({ message: "Job posted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}