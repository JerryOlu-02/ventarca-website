import { createRefreshCookie } from "@/lib/cookies";
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
  });

  const data = await resp.json();

  if (!resp.ok) {
    return NextResponse.json(data, { status: resp.status });
  }

  const { token: accessToken, refreshToken, user } = data;

  const response = NextResponse.json({
    success: true,
    accessToken,
    user,
  });

  response.headers.set("Set-Cookie", createRefreshCookie(refreshToken));

  return response;
}
