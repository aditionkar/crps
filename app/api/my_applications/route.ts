// app/api/my_applications/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
    try {
        // Get student_id from the session
        const session = await verifyAuth();
        
        if (!session || !session.userId || session.userType !== "student") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const studentId = session.userId;
        const connection = await pool.getConnection();

        try {
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
                WHERE ma.student_id = ?
                ORDER BY ma.applied_date DESC
            `, [studentId]);

            return NextResponse.json(applications, { status: 200 });
        } catch (dbError) {
            console.error("Database error:", dbError);
            return NextResponse.json(
                { message: "Error querying database" }, 
                { status: 500 }
            );
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json(
            { message: "Error fetching applications" }, 
            { status: 500 }
        );
    }
}