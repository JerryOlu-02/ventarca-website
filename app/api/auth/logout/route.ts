import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const cookie = req.headers.get("cookie") ?? "";
  const { accessToken } = await req.json();

  const resp = await fetch(`${process.env.BACKEND_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: cookie,
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (!resp.ok) {
    // return NextResponse.json({ status: resp.status });
    console.error("Backend logout failed (non-critical):", resp.statusText);
  }

  const outwardResponse = NextResponse.json({ ok: true });

  // const setCookie = resp?.headers?.get("set-cookie");
  // if (setCookie) outwardResponse.headers.set("Set-Cookie", setCookie);

  const isProduction = process.env.NODE_ENV === "production";
  const rootDomain = isProduction ? ".ventarca.biz" : undefined;

  // Delete the cookie

  cookieStore.delete({
    name: "refreshToken",
    path: "/",
    domain: rootDomain,
    secure: isProduction,
    httpOnly: true,
    sameSite: "lax",
  });

  cookieStore.delete({
    name: "user_session_id",
    path: "/",
    domain: rootDomain,
    secure: isProduction,
    httpOnly: true,
    sameSite: "lax",
  });

  return outwardResponse;
}
