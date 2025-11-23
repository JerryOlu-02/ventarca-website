"use client";

import ListingCard from "./ListingCard";

import Slider from "../common/Slider";
import { use } from "react";
import { GetHandPickedListingResponseData } from "@/utils/getHandpickedListings";

export default function ListingSlider({
  getHandpickedListingPromise,
}: {
  getHandpickedListingPromise: Promise<GetHandPickedListingResponseData>;
}) {
  const listingArray: React.ReactNode[] = [];

  const handpickedListings = use(getHandpickedListingPromise);

  if (!handpickedListings.data)
    return <div>Failed to fetch Handpicked Listings</div>;

  const handpickedListingsData = handpickedListings.data.data;

  handpickedListingsData.map((listing, i) =>
    listingArray.push(<ListingCard key={i} listing={listing} />)
  );

  return (
    <>
      <Slider
        slides={listingArray}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 2.5,
          },
        }}
        spaceBetween={24}
        showProgressBar
        className="slider_home"
      />
    </>
  );
}
