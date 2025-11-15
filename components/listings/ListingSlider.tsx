import ListingCard from "./ListingCard";

import ListingImg1 from "@/public/images/listing-1.jpg";
import ListingImg2 from "@/public/images/listing-2.jpg";
import ListingImg3 from "@/public/images/listing-3.jpg";
import Slider from "../common/Slider";
import { Listing } from "./types/index";

export default function ListingSlider() {
  const listings: Listing[] = [
    {
      id: 1,
      image: ListingImg1,
      name: "Home Interior Design Items Shop At The City Centre with Parking",
      location: "Cockermouth, Cumbria.",
      tags: ["Retail", "Home Decoration", "Shipping"],
      price: "£48.5K",
      revenue: "£140K",
      profit: "£27K",
    },
    {
      id: 2,
      image: ListingImg2,
      name: "Beautiful  Sectioned Retail Clothing Store With Home Delivery Option",
      location: "Exeter, Devon.",
      tags: ["Retail", "Fashion", "Shipping"],
      price: "£48.5K",
      revenue: "£293K",
      profit: "£84K",
    },
    {
      id: 3,
      image: ListingImg3,
      name: "Interior and Exterior Service Coffee Shop With Bicycle Parking",
      location: "Rye, East Sussex.",
      tags: ["Retail", "Resturant", "Shipping"],
      price: "£60.7K",
      revenue: "£80K",
      profit: "£27K",
    },
  ];

  const listingArray: React.ReactNode[] = [];

  const listingCardArray = listings.map((listing, i) =>
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
