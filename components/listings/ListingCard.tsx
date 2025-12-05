import "@/styles/components/listing/listings.scss";

import Location from "@/public/icon/location.svg";
import Bookmark from "@/public/icon/bookmark.svg";
// import Image from "next/image";

import Link from "next/link";
import { ListingCardResponse } from "@/types/listing";
import { formatCurrencyNumber } from "@/utils/formatCurrencyNumber";
import Image from "next/image";

interface ListingCardProp {
  listing: ListingCardResponse;
}

export default function ListingCard({ listing }: ListingCardProp) {
  const currency = listing.financialHighlights.currency;

  const profit = formatCurrencyNumber(listing.financialHighlights.lastFyEBITDA);

  const revenue = formatCurrencyNumber(
    listing.financialHighlights.lastFyRevenue
  );
  const price = formatCurrencyNumber(listing.valuation.askingPrice);

  return (
    <div className="listingCard">
      <div className="listingCard_image">
        <span className="move" />

        <Image
          src={listing.mediaAndDocumentation.listingCoverImage.path}
          width={100}
          height={100}
          alt="Listing_Image"
          loading="lazy"
          unoptimized
        />
      </div>

      <div className="listingCard_content">
        <h5>{listing.businessInfo.headline}</h5>

        <div className="listingCard_save">
          <span className="location-container">
            <Location />
            <span className="location">{listing.businessInfo.location}</span>
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
            <p className="listingCard_profitability_item-text">
              {currency}
              {price}
            </p>

            <div>
              <p>Price</p>

              <span>4.5X | 4.1X</span>
            </div>
          </div>

          <div className="listingCard_profitability_item">
            <p className="listingCard_profitability_item-text">
              {currency}
              {revenue}
            </p>

            <div>
              <p>Revenue</p>

              {/* <span>0.2X</span> */}
            </div>
          </div>

          <div className="listingCard_profitability_item">
            <p className="listingCard_profitability_item-text">
              {currency}
              {profit}
            </p>

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
