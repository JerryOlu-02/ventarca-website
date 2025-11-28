"use server";

import { getBaseUrl } from "@/utils/getBaseUrl";

export const subscribeToNewsLetter = async function (
  email: string,
  firstName?: string,
  lastName?: string
) {
  const baseUrl = await getBaseUrl();

  //   POST data to Brevo
  const resp = await fetch(`${baseUrl}/api/newsletter`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      ...(firstName && { firstName: firstName }),
      ...(lastName && { lastName: lastName }),
    }),
    credentials: "include",
  });
  const responseData = await resp.json();

  if (responseData.success)
    return {
      ok: true,
      errorMessage: null,
    };
  else return { ok: false, errorMessage: responseData.error as string };
};
