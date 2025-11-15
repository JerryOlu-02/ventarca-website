import "@/styles/components/listing/listings.scss";

import Button from "../common/Button";
import Location from "@/public/icon/location.svg";
import Bookmark from "@/public/icon/bookmark.svg";
import Image from "next/image";

import { Listing } from "./types/index";
import Link from "next/link";

interface ListingCardProp {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProp) {
  return (
    <div className="listingCard">
      <div className="listingCard_image">
        <Image src={listing.image} alt="Listing_Image" />
      </div>

      <div className="listingCard_content">
        <h5>{listing.name}</h5>

        <div className="listingCard_save">
          <span>
            <Location />
            {listing.location}
          </span>

          <span>
            <Bookmark />
            Save
          </span>
        </div>

        <div className="listingCard_tags">
          {listing.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>

        <div className="listingCard_profitability">
          <div className="listingCard_profitability_item">
            <p>{listing.price}</p>

            <div>
              <p>Price</p>

              <span>0.2X</span>
            </div>
          </div>

          <div className="listingCard_profitability_item">
            <p>{listing.revenue}</p>

            <div>
              <p>Revenue</p>

              {/* <span>0.2X</span> */}
            </div>
          </div>

          <div className="listingCard_profitability_item">
            <p>{listing.profit}</p>

            <div>
              <p>Profit</p>

              {/* <span>20%</span> */}
            </div>
          </div>
        </div>

        <Link
          href={`/listing/${listing.id}`}
          className="btn btn-primary btn-small"
        >
          View Listing
        </Link>
      </div>
    </div>
  );
}
