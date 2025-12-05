import { ErrorResponse, RefreshResponse } from "@/types/apiResponse";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  const allowedOrigins = [
    "https://preview.ventarca.biz",
    "https://dashboard.ventarca.biz",
    "http://localhost:3000",
    "http://localhost:5173",
  ];

  // Block requests from tools like Postman or Malicious Sites
  if (!origin || !allowedOrigins.includes(origin)) {
    return NextResponse.json({ message: "Forbidden Origin" }, { status: 403 });
  }

  const cookieStore = await cookies();
  const backend = process.env.BACKEND_API_URL!;

  // Extract cookies from incoming request
  const cookieHeader = req.headers.get("cookie") ?? "";

  // console.log("Cookie header --->", cookieHeader);

  const resp = await fetch(`${backend}/auth/refresh`, {
    method: "POST",

    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },

    credentials: "include",
  });

  const data = await resp.json();

  // Only delete cookie on 401 (Expired/Invalid)
  if (resp.status === 401) {
    cookieStore.delete({
      name: "refreshToken",
      path: "/",
      httpOnly: true,
    });
    // secure: true,

    return NextResponse.json({ message: "Session expired" }, { status: 401 });
  }

  if (!resp.ok) {
    // User not signed in → clear set-cookie header
    const errorData: ErrorResponse = data;

    const outwardResponse = NextResponse.json(errorData, {
      status: resp.status,
    });

    return outwardResponse;
  }

  // backend returns { token, tokenExpires }
  const successData: RefreshResponse = data;

  const outwardResponse = NextResponse.json({
    token: successData.token,
    tokenExpires: successData.tokenExpires,
  });

  // Set new refresh token cookie
  const setCookieHeader = resp.headers.get("set-cookie");

  if (setCookieHeader) {
    const parsed = parse(setCookieHeader);
    const newRefreshToken = parsed.refreshToken;

    if (newRefreshToken) {
      const isProduction = process.env.NODE_ENV === "production";

      outwardResponse.cookies.set({
        name: "refreshToken",
        value: newRefreshToken,
        httpOnly: true,
        secure: isProduction,
        path: "/",
        sameSite: "lax",
        domain: isProduction ? ".ventarca.biz" : undefined,
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  }

  // if (setCookieHeader) outwardResponse.headers.set("Set-Cookie", setCookieHeader);

  return outwardResponse;
}
