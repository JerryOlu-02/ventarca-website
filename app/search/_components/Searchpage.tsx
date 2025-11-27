import { searchHeroListing } from "@/actions/search";

import SearchPageClient from "./SearchpageClient";
import { Suspense } from "react";

export default async function Searchpage({
  industry,
  location,
  priceRange,
  sort,
  page,
}: {
  industry: string | undefined;
  location: string | undefined;
  priceRange: string | undefined;
  sort: string | undefined;
  page: string | undefined;
}) {
  const pageNo = page ? parseInt(page) : undefined;

  const response = await searchHeroListing({
    searchData: {
      location,
      industry,
      priceRange,
      sort,
      page: pageNo,
    },
  });

  if (!response.data) {
    console.log("Search Failed", response.error);

    return <>Search Failed</>;
  }

  const listingsCardData = response.data.data;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <SearchPageClient
        location={location}
        industry={industry}
        listingsCardData={listingsCardData}
        pageNo={pageNo}
        noOfListings={response.data.total}
      />
    </Suspense>
  );
}
