import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTE } from "./enum/routes/protectedRoute";
import { PUBLIC_ROUTE } from "./enum/routes/authRoute";

export default function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const response = NextResponse.next();

  const protectedClientRoute = Object.values(PROTECTED_ROUTE).map(
    (route) => route.split("?")[0],
  );

  if (protectedClientRoute.includes(pathname) && !token) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTE.DEFAULT, origin));
  }

  if (
    (pathname === PUBLIC_ROUTE.LOGIN || pathname === PUBLIC_ROUTE.DEFAULT) &&
    token
  ) {
    return NextResponse.redirect(new URL(PROTECTED_ROUTE.BLOGS_LIST, origin));
  }
  if (pathname === PUBLIC_ROUTE.DEFAULT || pathname === PUBLIC_ROUTE.LOGIN) {
    return NextResponse.rewrite(new URL(PUBLIC_ROUTE.LOGIN, req.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/login", "/blogs"],
};
