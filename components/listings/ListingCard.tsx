import "@/styles/components/listing/listings.scss";

import Button from "../common/Button";
import Location from "@/public/icon/location.svg";
import Bookmark from "@/public/icon/bookmark.svg";
import Image from "next/image";

import Link from "next/link";

interface ListingCardProp {
  listing: ListingCardResponse;
}

export default function ListingCard({ listing }: ListingCardProp) {
  return (
    <div className="listingCard">
      <div className="listingCard_image">
        <span className="move" />
        <Image
          src={listing.mediaAndDocumentation.listingCoverImage.path}
          width={100}
          height={100}
          alt="Listing_Image"
          unoptimized
        />
      </div>

      <div className="listingCard_content">
        <h5>{listing.businessInfo.headline}</h5>

        <div className="listingCard_save">
          <span>
            <Location />
            {listing.businessInfo.location}
          </span>

          <span>
            <Bookmark />
            Save
          </span>
        </div>

        <div className="listingCard_tags">
          {/* {listing.businessInfo.industry.map((tag, i) => ( */}
          <span>{listing.businessInfo.industry.name}</span>
          {/* ))} */}
        </div>

        <div className="listingCard_profitability">
          <div className="listingCard_profitability_item">
            <p>{listing.valuation.askingPrice}</p>

            <div>
              <p>Price</p>

              <span>0.2X</span>
            </div>
          </div>

          <div className="listingCard_profitability_item">
            <p>{listing.financialHighlights.lastFyRevenue}</p>

            <div>
              <p>Revenue</p>

              {/* <span>0.2X</span> */}
            </div>
          </div>

          <div className="listingCard_profitability_item">
            <p>{listing.financialHighlights.lastFyEBITDA}</p>

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
