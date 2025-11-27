import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/confirm-email",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const loggedIn = request.cookies.get("refreshToken")?.value;

  // console.log("Proxy Refresh Cookie--->", refreshCookie);

  // Redirect authenticated users away from auth pages
  if (isPublicRoute && loggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protected routes
  const protectedRoutes = ["/support-center", "/onboarding"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users to signin
  if (isProtectedRoute && !loggedIn) {
    const url = new URL("/login", request.url);

    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/support-center/:path*",
    "/onboarding/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/forgot-password/:path*",
    "/reset-password",
    "/confirm-email",
  ],
};
