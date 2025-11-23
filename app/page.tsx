import ErrorBoundary from "@/components/common/ErrorBoundary";
import ListingSlider from "@/components/listings/ListingSlider";
import ListingSliderLoading from "@/components/listings/ListingSliderLoading";
import Homepage from "@/components/ui/home/Homepage";

import { getHandpickedListings } from "@/utils/getHandpickedListings";
import { Suspense } from "react";

export default function Home() {
  const handpickedListingsPromise = getHandpickedListings();

  return (
    <main className="main">
      <Homepage
        listingSliderComponent={
          <ErrorBoundary fallback={<div>Something Went Wrong...</div>}>
            <Suspense fallback={<ListingSliderLoading />}>
              <ListingSlider
                getHandpickedListingPromise={handpickedListingsPromise}
              />
            </Suspense>
          </ErrorBoundary>
        }
      />
    </main>
  );
}
