import { NextResponse } from "next/server";
import pool from "@/lib/db"; 

export async function GET() {
    try {
        const connection = await pool.getConnection(); 

        const [applications] = await connection.execute(`
            SELECT 
                ma.my_application_id, 
                ma.student_id, 
                ma.jobs_id, 
                ma.title, 
                ma.company, 
                ma.description, 
                ma.status, 
                ma.applied_date, 
                ma.stage_applied_date, 
                ma.stage_under_review_date, 
                ma.stage_interview_date, 
                ma.stage_decision_date, 
                ma.applied_completed, 
                ma.under_review_completed, 
                ma.interview_completed, 
                ma.decision_completed,
                s.name AS student_name, 
                s.email, 
                j.title AS job_title, 
                j.company_name 
            FROM my_applications ma
            JOIN students s ON ma.student_id = s.student_id
            JOIN jobs j ON ma.jobs_id = j.jobs_id
            ORDER BY ma.applied_date DESC
        `);

        connection.release(); 

        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching applications", error }, { status: 500 });
    }
}
