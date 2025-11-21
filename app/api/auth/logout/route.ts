import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
    return NextResponse.json({ status: resp.status });
  }

  // backend clears the HttpOnly refresh cookie

  const outwardResponse = NextResponse.json({ ok: true });

  const setCookie = resp?.headers?.get("set-cookie");
  if (setCookie) outwardResponse.headers.set("Set-Cookie", setCookie);

  if (resp?.ok) {
    const cookieStore = await cookies();

    cookieStore.set({
      name: "logged_in",
      value: "",
      maxAge: 0,
      path: "/",
    });
  }

  return outwardResponse;
}
