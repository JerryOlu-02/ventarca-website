import { searchHeroListing } from "@/actions/search";

import Searchpage from "./_components/Searchpage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const location = params.location as string;

  const industry = params.industry as string | undefined;

  const priceRange = params.priceRange as string | undefined;

  const response = await searchHeroListing({
    location: location,
    industry: industry,
    priceRange: priceRange,
  });

  if (!response.data) return console.log("Search Failed", response.error);

  const listingsCardData = response.data.data;

  return <Searchpage listings={listingsCardData} />;
}
