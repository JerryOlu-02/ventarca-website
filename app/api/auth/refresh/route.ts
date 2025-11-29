import { ErrorResponse, RefreshResponse } from "@/types/apiResponse";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
  const setCookie = resp.headers.get("set-cookie");

  if (setCookie) outwardResponse.headers.set("Set-Cookie", setCookie);

  return outwardResponse;
}
