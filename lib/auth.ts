// lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use environment variable in production

export interface SessionData {
    userId: number;
    userType: string;
    email: string;
    name?: string;
}

export async function createSession(userData: SessionData): Promise<string> {
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
    return token;
}

export async function verifyAuth(): Promise<SessionData | null> {
    try {
        // Get the cookie in a way that works with Next.js App Router
        const cookiesList = cookies();
        const sessionCookie = cookiesList.get("session");
        
        if (!sessionCookie) {
            return null;
        }
        
        const token = sessionCookie.value;
        
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as SessionData;
            return decoded;
        } catch (error) {
            console.error("Auth verification error:", error);
            return null;
        }
    } catch (error) {
        console.error("Cookie access error:", error);
        return null;
    }
}