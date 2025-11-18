import { clearRefreshCookie, createRefreshCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backend = process.env.BACKEND_API_URL!;

  // Extract cookies from incoming request
  const cookieHeader = req.headers.get("cookie") ?? "";

  const resp = await fetch(`${backend}/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: cookieHeader,
    },
  });

  const data = await resp.json();

  if (!resp.ok) {
    // Clear cookie
    const response = NextResponse.json(data, { status: resp.status });
    response.headers.set("Set-Cookie", clearRefreshCookie());
    return response;
  }

  const { token: accessToken, refreshToken } = data;

  console.log("Incoming Cookie", refreshToken);

  const response = NextResponse.json({
    accessToken,
  });

  // Set new refresh token cookie
  response.headers.set("Set-Cookie", createRefreshCookie(refreshToken));

  return response;
}
