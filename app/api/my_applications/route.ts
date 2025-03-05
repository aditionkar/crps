import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the MySQL connection pool

export async function GET() {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool

        const [applications] = await connection.execute(`
            SELECT 
                ma.my_application_id, 
                ma.status, 
                ma.applied_at, 
                ma.role, 
                ma.applied_on, 
                s.name AS student_name, 
                s.email, 
                j.title AS job_title, 
                j.company_name 
            FROM my_applications ma
            JOIN students s ON ma.student_id = s.student_id
            JOIN jobs j ON ma.jobs_id = j.jobs_id
            ORDER BY ma.applied_on DESC
        `);

        connection.release(); // Release the connection back to the pool

        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching applications", error }, { status: 500 });
    }
}
