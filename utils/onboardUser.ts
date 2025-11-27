import apiClient from "@/lib/axios";
import { ErrorResponse } from "@/types/apiResponse";

export async function onboardUser(preference: string, intrests: string[]) {
  try {
    const response = await apiClient.post("/users/onboarding/preferences", {
      preference: preference,
      interests: intrests,
    });

    console.log("Onboarded Successfully--->", response.data);

    return {
      success: true,
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;
    console.log("Onboarding Failed--->", errorData);

    return {
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
    };
  }
}
