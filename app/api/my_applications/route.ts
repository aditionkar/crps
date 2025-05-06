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

// app/api/my_applications/route.ts - Modified PUT handler
export async function PUT(req: Request) {
    try {
        // Parse request body
        const { 
            studentId,
            jobId,
            action, 
            interviewDate = null 
        } = await req.json();

        if (!studentId || !jobId || !action) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();
        
        try {
            let queryParams = [];
            let query = '';
            
            if (action === "accept") {
                // Use the exact query format you provided for acceptance
                query = `
                    UPDATE my_applications
                    SET 
                        status = 'Interview Scheduled',
                        stage_under_review_date = ?,
                        stage_interview_date = ?,
                        stage_decision_date = '',
                        under_review_completed = TRUE,
                        interview_completed = FALSE,
                        decision_completed = FALSE
                    WHERE student_id = ? AND jobs_id = ?
                `;
                
                // Format current date for stage_under_review_date
                const currentDate = new Date().toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                }).replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3');
                
                queryParams = [
                    currentDate,
                    interviewDate, // The interview date from your input
                    studentId,
                    jobId
                ];
            } else if (action === "reject") {
                // Use the exact query format you provided for rejection
                query = `
                    UPDATE my_applications
                    SET 
                        status = 'Application Rejected',
                        stage_under_review_date = 'Rejected',
                        stage_interview_date = '',
                        stage_decision_date = '',
                        under_review_completed = TRUE,
                        interview_completed = FALSE,
                        decision_completed = FALSE
                    WHERE student_id = ? AND jobs_id = ?
                `;
                
                queryParams = [studentId, jobId];
            } else {
                return NextResponse.json(
                    { message: "Invalid action" },
                    { status: 400 }
                );
            }

            // Execute the update query
            const [result] = await connection.execute(query, queryParams);

            // @ts-ignore
            if (result.affectedRows === 0) {
                return NextResponse.json(
                    { message: "Application not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { 
                    message: `Application ${action === "accept" ? "accepted and interview scheduled" : "rejected"} successfully` 
                }, 
                { status: 200 }
            );
        } catch (dbError) {
            console.error("Database error:", dbError);
            return NextResponse.json(
                { message: "Error updating application" },
                { status: 500 }
            );
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Error updating application:", error);
        return NextResponse.json(
            { message: "Error updating application" },
            { status: 500 }
        );
    }
}