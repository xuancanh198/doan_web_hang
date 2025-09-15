// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminToken = req.cookies.get("admin_token")?.value;

  if (pathname.startsWith("/admin")) {
    if (!adminToken && !pathname.startsWith("/admin/login")) {
      // chưa có token -> redirect login
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    if (adminToken && pathname === "/admin/login") {
      // đã có token -> redirect home
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = "/admin/home";
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // áp dụng cho tất cả route /admin/*
};
