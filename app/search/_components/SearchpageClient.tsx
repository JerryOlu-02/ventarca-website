import ListingList from "@/components/listings/ListingList";
import SearchHeader from "./SearchHeader";
import SearchPagination from "./SearchPagination";
import { ListingCardResponse } from "@/types/listing";

export default function SearchPageClient({
  location,
  industry,
  listingsCardData,
  pageNo,
  noOfListings,
}: {
  location: string | undefined;
  industry: string | undefined;
  listingsCardData: ListingCardResponse[];
  pageNo: number | undefined;
  noOfListings: number;
}) {
  return (
    <aside className="search_page">
      <SearchHeader
        location={location}
        industry={industry}
        noOfListings={noOfListings}
      />

      <section className="section section_listings">
        <div className="page_width listing_list">
          <ListingList listings={listingsCardData} />
        </div>
      </section>

      <SearchPagination
        currentSelectedPage={pageNo}
        noOfListings={noOfListings}
      />
    </aside>
  );
}
