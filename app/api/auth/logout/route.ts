// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backend = process.env.BACKEND_API_URL!;
  // forward cookie for backend logout (optional)
  const cookieHeader = req.headers.get("cookie") ?? "";

  await fetch(`${backend}/auth/logout`, {
    method: "POST",
    headers: { Cookie: cookieHeader },
  }).catch(() => {});

  const res = NextResponse.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    `refreshToken=deleted; HttpOnly; Secure; Path=/; SameSite=Lax; Domain=.ventarca.biz; Max-Age=0`
  );
  return res;
}
