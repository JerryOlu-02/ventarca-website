import { ErrorResponse, LoginSuccessResponse } from "@/types/apiResponse";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const backend = process.env.BACKEND_API_URL!;

  // Call backend login API
  const resp = await fetch(`${backend}/auth/email/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await resp.json();

  if (!resp.ok) {
    const errorData: ErrorResponse = data;

    return NextResponse.json(errorData, { status: resp.status });
  }

  // Foward HttpOnly cookie Backend sets
  const setCookie = resp.headers.get("set-cookie");

  const { token, user, tokenExpires }: LoginSuccessResponse = data;

  const outwardResponse = NextResponse.json({
    success: true,
    token,
    tokenExpires,
    user,
  });

  // if (setCookie) {
  //   outwardResponse.headers.set("Set-Cookie", setCookie);
  // }

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

      outwardResponse.cookies.set({
        name: "user_session_id",
        value: `${user.id}`,
        httpOnly: true,
        secure: isProduction,
        path: "/",
        sameSite: "lax",
        domain: isProduction ? ".ventarca.biz" : undefined,
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  }

  return outwardResponse;
}
