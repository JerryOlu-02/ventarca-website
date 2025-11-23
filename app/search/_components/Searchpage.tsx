"use client";

import { Listing } from "@/components/listings/types";

import Button from "@/components/common/Button";

import SortImg from "@/public/icon/sort.svg";
import ListingList from "@/components/listings/ListingList";

import ListingImg1 from "@/public/images/listing-1.jpg";
import ListingImg2 from "@/public/images/listing-2.jpg";
import ListingImg3 from "@/public/images/listing-3.jpg";
import { useSearchParams } from "next/navigation";

const listingsFake: Listing[] = [
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
  {
    id: 4,
    image: ListingImg1,
    name: "Interior and Exterior Service Coffee Shop With Bicycle Parking",
    location: "Rye, East Sussex.",
    tags: ["Retail", "Resturant", "Shipping"],
    price: "£60.7K",
    revenue: "£80K",
    profit: "£27K",
  },
  {
    id: 5,
    image: ListingImg2,
    name: "Interior and Exterior Service Coffee Shop With Bicycle Parking",
    location: "Rye, East Sussex.",
    tags: ["Retail", "Resturant", "Shipping"],
    price: "£60.7K",
    revenue: "£80K",
    profit: "£27K",
  },
  {
    id: 6,
    image: ListingImg3,
    name: "Interior and Exterior Service Coffee Shop With Bicycle Parking",
    location: "Rye, East Sussex.",
    tags: ["Retail", "Resturant", "Shipping"],
    price: "£60.7K",
    revenue: "£80K",
    profit: "£27K",
  },
  {
    id: 7,
    image: ListingImg2,
    name: "Interior and Exterior Service Coffee Shop With Bicycle Parking",
    location: "Rye, East Sussex.",
    tags: ["Retail", "Resturant", "Shipping"],
    price: "£60.7K",
    revenue: "£80K",
    profit: "£27K",
  },
  {
    id: 8,
    image: ListingImg1,
    name: "Interior and Exterior Service Coffee Shop With Bicycle Parking",
    location: "Rye, East Sussex.",
    tags: ["Retail", "Resturant", "Shipping"],
    price: "£60.7K",
    revenue: "£80K",
    profit: "£27K",
  },
  {
    id: 9,
    image: ListingImg3,
    name: "Interior and Exterior Service Coffee Shop With Bicycle Parking",
    location: "Rye, East Sussex.",
    tags: ["Retail", "Resturant", "Shipping"],
    price: "£60.7K",
    revenue: "£80K",
    profit: "£27K",
  },
];

export default function Searchpage({
  listings,
}: {
  listings: ListingCardResponse[];
}) {
  // console.log("Listings", listings);
  // const searchParams = useSearchParams();

  // const location = searchParams.get("location");

  // const industry = searchParams.get("industry");

  // const priceRange = searchParams.get("priceRange");

  return (
    <>
      <section className="section section_header">
        <div className="page_width search_header">
          <h3>E-commerce</h3>

          <div className="search_sort">
            <p>
              Showing 500+ results sorted by <span>date published</span>
            </p>

            <Button className="btn btn-secondary btn-small">
              <SortImg />
              SORT BY
            </Button>
          </div>
        </div>
      </section>

      <section className="section section_listings">
        <div className="page_width listing_list">
          <ListingList listings={listings} />
        </div>
      </section>
    </>
  );
}
