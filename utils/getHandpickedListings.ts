import apiClient from "@/lib/axios";
import { ErrorResponse } from "@/types/apiResponse";
import { ListingSearchResponse } from "@/types/listing";

export type GetHandPickedListingResponseData =
  | {
      success?: boolean;
      data: ListingSearchResponse;
      error?: undefined;
    }
  | { error: any; data: undefined; success?: undefined };

export async function getHandpickedListings() {
  try {
    const response = await apiClient.get("/listing/search", {
      params: {
        page: 1,
        limit: 5,
      },
    });

    return {
      success: true,
      data: response.data as ListingSearchResponse,
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

export async function getSimilarListings(industry: string) {
  try {
    const response = await apiClient.get("/listing/search", {
      params: {
        page: 1,
        limit: 6,
        filters: {
          industries: [industry],
        },
      },
    });

    // console.log("Searched Similar Listings--->", response.config.params);

    return {
      success: true,
      data: response.data as ListingSearchResponse,
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
