import { searchHeroListing } from "@/actions/search";
import Button from "@/components/common/Button";
import ListingList from "@/components/listings/ListingList";

import SortImg from "@/public/icon/sort.svg";
import SearchHeader from "./SearchHeader";

export default async function Searchpage({
  industry,
  location,
  priceRange,
}: {
  industry: string | undefined;
  location: string | undefined;
  priceRange: string | undefined;
}) {
  const response = await searchHeroListing({
    location: location,
    industry: industry,
    priceRange: priceRange,
  });

  if (!response.data) {
    console.log("Search Failed", response.error);

    return <>Search Failed</>;
  }

  const listingsCardData = response.data.data;

  return (
    <>
      <SearchHeader
        location={location}
        industry={industry}
        noOfListings={response.data.total}
      />

      <section className="section section_listings">
        <div className="page_width listing_list">
          <ListingList listings={listingsCardData} />
        </div>
      </section>
    </>
  );
}
