"use server";

import apiClient from "@/lib/axios";
import { ErrorResponse } from "@/types/apiResponse";
import { ListingDetailResponse, ListingSearchResponse } from "@/types/listing";
import { SearchSchema } from "@/utils/types/searchSchema";
import z from "zod";

type HeroSearchInput = {
  location: string | undefined;
  industry: string | undefined;
  priceRange: string | undefined;
};

export async function searchHeroListing(searchData: HeroSearchInput) {
  const validiatedRegisterUserData = SearchSchema.safeParse(searchData);

  if (!validiatedRegisterUserData.success) {
    const formFieldErrors = z.flattenError(validiatedRegisterUserData.error);

    return {
      error: {
        industry: formFieldErrors.fieldErrors.industry?.[0],
        location: formFieldErrors.fieldErrors.location?.[0],
        priceRange: formFieldErrors.fieldErrors.priceRange?.[0],
      },
    };
  }

  const data = validiatedRegisterUserData.data;

  const priceRange = data.priceRange
    ? data.priceRange.split("-").map((price) => Number(price))
    : undefined;

  const minAskingPrice = priceRange && priceRange[0];
  const maxAskingPrice = priceRange && priceRange[1];

  try {
    const response = await apiClient.get("/listing/search", {
      params: {
        page: 1,
        limit: 9,
        filters: {
          ...(data.location && { location: data.location }),
          ...(data.industry && { industries: [data.industry] }),
          ...(maxAskingPrice && { minAskingPrice: minAskingPrice }),
          ...(minAskingPrice && { maxAskingPrice: maxAskingPrice }),
        },
      },
    });

    console.log("Search Successful", response.data);

    return {
      success: true,
      data: response.data as ListingSearchResponse,
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;
    console.error("Search Failed --->", errorData);

    return {
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
      data: undefined,
    };
  }
}

export async function getListingDetail(id: number) {
  try {
    const response = await apiClient.get(`/listing/${id}`, {
      params: {},
    });

    console.log("Search Successful", response.data);

    return {
      success: true,
      data: response.data as ListingDetailResponse,
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;

    console.error("Listing Detail Search Failed --->", errorData);

    return {
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
      data: undefined,
    };
  }
}
