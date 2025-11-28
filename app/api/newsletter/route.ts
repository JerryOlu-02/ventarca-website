import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    email,
    firstName,
    lastName,
  }: { firstName: string; lastName?: string; email: string } = await req.json();

  const brevoUrl = process.env.BREVO_API_URL!;
  const brevApiKey = process.env.BREVO_API_KEY!;

  const resp = await fetch(`${brevoUrl}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "api-key": `${brevApiKey}`,
    },
    body: JSON.stringify({
      email: email,
      ...(firstName && {
        attributes: { FIRSTNAME: firstName, LASTNAME: lastName },
      }),
      updateEnabled: false,
      listIds: [2],
    }),
    credentials: "include",
  });

  const data = await resp.json();

  if (!resp.ok) {
    const outwardResponse = NextResponse.json({
      success: false,
      error: data.message,
    });

    return outwardResponse;
  }

  const outwardResponse = NextResponse.json({
    success: true,
  });

  return outwardResponse;
}
