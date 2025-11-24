import apiClient from "@/lib/axios";
import { ErrorResponse } from "@/types/apiResponse";
import { Industries, IndustriesResponse } from "@/types/industries";

export type GetIndustries = {
  success?: boolean;
  data: Industries | undefined;
  error?: any;
};

export async function getIndustriesFromBackend() {
  try {
    const response = await apiClient.get("/industries", {});

    return {
      success: true,
      data: response.data as IndustriesResponse,
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;
    // console.error("Search Failed --->", errorData);

    return {
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
      data: undefined,
    };
  }
}
