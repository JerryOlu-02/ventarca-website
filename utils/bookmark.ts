import apiClient from "@/lib/axios";
import { ErrorResponse } from "@/types/apiResponse";

export async function fetchMyBookmarks() {
  try {
    const response = await apiClient.put(
      "https://api.ventarca.biz/api/bookmark/me"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;

    return {
      success: false,
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
    };
  }
}

export async function addListingBookmark(listingId: number) {
  try {
    const response = await apiClient.put(
      `https://api.ventarca.biz/api/bookmark/add?listingId=${listingId}`
    );

    return {
      success: true,
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;
    console.log(errorData);

    return {
      success: false,
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
    };
  }
}

export async function removeBookmak(bookmarkId: number) {
  try {
    const response = await apiClient.put(
      "https://api.ventarca.biz/api/bookmark/remove",
      {
        params: {
          bookmarkId,
        },
      }
    );

    return {
      success: true,
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;

    return {
      success: undefined,
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
    };
  }
}
