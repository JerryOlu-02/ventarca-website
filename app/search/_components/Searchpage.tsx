import { searchHeroListing } from "@/actions/search";
import ListingList from "@/components/listings/ListingList";

import SearchHeader from "./SearchHeader";
import SearchPagination from "./SearchPagination";

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
    <aside className="search_page">
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

      <SearchPagination
        currentSelectedPage={pageNo}
        noOfListings={response.data.total}
      />
    </aside>
  );
}
