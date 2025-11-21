"use server";

import apiClient from "@/lib/axios";
import { SearchInput, SearchSchema } from "@/utils/types/searchSchema";
import z from "zod";

export async function searchListing(searchData: SearchInput) {
  const validiatedRegisterUserData = SearchSchema.safeParse(searchData);

  if (!validiatedRegisterUserData.success) {
    const formFieldErrors = z.flattenError(validiatedRegisterUserData.error);

    return {
      error: {
        industry: formFieldErrors.fieldErrors.industry?.[0],
        location: formFieldErrors.fieldErrors.location?.[0],
        moreFilters: formFieldErrors.fieldErrors.moreFilters?.[0],
        priceRange: formFieldErrors.fieldErrors.priceRange?.[0],
      },
    };
  }

  const data = validiatedRegisterUserData.data;

  try {
    const response = await apiClient.get("/listing/search", {
      params: {
        limit: 9,
        filters: {
          location: "nigeria",
          industries: [""],
        },
      },
    });

    console.log("Search Successful", response.data);
  } catch (error: any) {
    console.error("Seaech failed FAILED", error.status);

    return {
      error: { form: "Sign Up Failed" },
    };
  }
}
