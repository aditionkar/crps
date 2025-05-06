// app/api/my_applications/update-status/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        let session;
        try {
            session = await verifyAuth();
            
            if (!session || !session.userId || session.userType !== "recruiter") {
                return NextResponse.json(
                    { message: "Unauthorized" },
                    { status: 401 }
                );
            }
        } catch (authError) {
            return NextResponse.json(
                { message: "Authentication failed" },
                { status: 401 }
            );
        }

        const { 
            applicationId, 
            newStatus
        } = await request.json();

        if (!applicationId || !newStatus) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();

        try {
            const currentDate = new Date().toISOString().split('T')[0];
            
            let updateFields;
            let updateValues;

            if (newStatus === "Application Rejected") {
                updateFields = `
                    status = ?, 
                    stage_decision_date = ?, 
                    decision_completed = true
                `;
                updateValues = [newStatus, "Rejected"];
            } else if (newStatus === "Interview Scheduled") {
                updateFields = `
                    status = ?, 
                    stage_under_review_date = ?, 
                    under_review_completed = true,
                    stage_interview_date = ?,
                    interview_completed = false
                `;
                updateValues = [newStatus, currentDate, currentDate];
            } else {
                updateFields = `status = ?`;
                updateValues = [newStatus];
            }

            await connection.execute(
                `UPDATE my_applications 
                 SET ${updateFields}
                 WHERE my_application_id = ?`,
                [...updateValues, applicationId]
            );

            return NextResponse.json(
                { 
                    message: "Application status updated successfully",
                    status: newStatus
                },
                { status: 200 }
            );
        } catch (dbError) {
            console.error("Database error:", dbError);
            return NextResponse.json(
                { message: "Error updating application status" },
                { status: 500 }
            );
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Error updating application status:", error);
        return NextResponse.json(
            { message: "Error updating application status" },
            { status: 500 }
        );
    }
}