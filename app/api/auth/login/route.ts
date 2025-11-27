import { ErrorResponse, LoginSuccessResponse } from "@/types/apiResponse";
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

  if (setCookie) {
    outwardResponse.headers.set("Set-Cookie", setCookie);
  }

  // // Set SSR session cookie
  // const cookieStore = await cookies();

  // cookieStore.set({
  //   name: "logged_in",
  //   value: "true",
  //   path: "/",
  //   httpOnly: true,
  //   sameSite: "lax",
  //   secure: process.env.NODE_ENV === "production",
  //   maxAge: 60 * 60 * 24 * 7,
  // });

  return outwardResponse;
}
