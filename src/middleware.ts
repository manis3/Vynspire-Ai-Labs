import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();

  if (pathname === "/" || pathname === "/login") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/login"],
};
