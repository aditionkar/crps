// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose'; 

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isStudentPath = path.startsWith('/student');
  const isRecruiterPath = path.startsWith('/recruiter');
  const isAuthRequired = isStudentPath || isRecruiterPath;
  
  const token = request.cookies.get('session')?.value;
  
  if (isAuthRequired && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isAuthRequired && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
      const { payload } = await jose.jwtVerify(token, secret);
      const decoded = payload as { userType: string };
      
      if (isStudentPath && decoded.userType !== 'student') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      if (isRecruiterPath && decoded.userType !== 'company') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/recruiter/:path*'],
};