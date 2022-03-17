import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  // token will be there if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // User will be allowed if the following is true
  // 1) its a request for next-auth session and provider fetchiing
  // 2) the token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
