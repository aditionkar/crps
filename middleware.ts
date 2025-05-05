// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose'; // Using jose instead of jsonwebtoken for Edge runtime

// This middleware runs on all routes
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define which paths require authentication
  const isStudentPath = path.startsWith('/student');
  const isRecruiterPath = path.startsWith('/recruiter');
  const isAuthRequired = isStudentPath || isRecruiterPath;
  
  // Check for session token in cookies
  const token = request.cookies.get('session')?.value;
  
  // If the path requires auth and there's no token, redirect to login
  if (isAuthRequired && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If there is a token, verify it and check user type
  if (isAuthRequired && token) {
    try {
      // Using jose instead of jsonwebtoken for Edge runtime compatibility
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
      const { payload } = await jose.jwtVerify(token, secret);
      const decoded = payload as { userType: string };
      
      // Check if user is trying to access a path they don't have permission for
      if (isStudentPath && decoded.userType !== 'student') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      if (isRecruiterPath && decoded.userType !== 'company') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: ['/student/:path*', '/recruiter/:path*'],
};