"use client";

import ListingCard from "./ListingCard";

import Slider from "../common/Slider";
import { use } from "react";
import { GetHandPickedListingResponseData } from "@/utils/getHandpickedListings";

export default function ListingSlider({
  getListingPromise,
}: {
  getListingPromise: Promise<GetHandPickedListingResponseData>;
}) {
  const listingArray: React.ReactNode[] = [];

  const listings = use(getListingPromise);

  if (!listings.data) return <div>Failed to fetch Listings</div>;

  const listingsData = listings.data.data;

  listingsData.map((listing, i) =>
    listingArray.push(<ListingCard key={i} listing={listing} />)
  );

  return (
    <>
      <Slider
        slides={listingArray}
        breakpoints={{
          320: {
            slidesPerView: 1.0,
          },
          460: {
            slidesPerView: 1.1,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 1.8,
          },
          1100: {
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
