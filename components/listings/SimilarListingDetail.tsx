import { GetHandPickedListingResponseData } from "@/utils/getHandpickedListings";
import ListingSlider from "./ListingSlider";
import "@/styles/components/listing/similar-listings.scss";
import { Suspense } from "react";
import ErrorBoundary from "../common/ErrorBoundary";
import ListingSliderLoading from "./ListingSliderLoading";

export default function SimilarListingDetail({
  similarListingPromise,
}: {
  similarListingPromise: Promise<GetHandPickedListingResponseData>;
}) {
  return (
    <section className="section">
      <div className="page_width similar_listings">
        <h2>Similar Listings</h2>

        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<ListingSliderLoading />}>
            <ListingSlider getListingPromise={similarListingPromise} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
