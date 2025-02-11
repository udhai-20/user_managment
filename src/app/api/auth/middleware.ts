import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(req: Request) {
  const cookies = parseCookies({ req });
  const token = cookies['accessToken'];

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url)); 
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); 
  } catch (error) {
    console.log('error:', error)
    return NextResponse.redirect(new URL('/auth/login', req.url)); 
  }
}

export const config = {
  matcher: ['/dashboard', '/tasks/:path'], 
};
