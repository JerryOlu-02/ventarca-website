import { headers } from "next/headers";

// MUST BE CALLED FROM A SERVER FUNCTION

export async function getBaseUrl() {
  // if (typeof window !== "undefined") return "";
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // return "http://localhost:3000";

  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");

  return host?.startsWith("localhost") ? `http://${host}` : `https://${host}`;
}
