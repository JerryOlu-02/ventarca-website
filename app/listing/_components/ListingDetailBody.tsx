import ArrowDown from "@/public/icon/arrow-down.svg";
import LoactionSvg from "@/public/icon/location.svg";
import ViewsSvg from "@/public/icon/views.svg";
import BookmarksSvg from "@/public/icon/bookmark.svg";
import Bookmarks2Svg from "@/public/icon/bookmark-2.svg";
import VerifiedSvg from "@/public/icon/verified.svg";

import ListingChart from "@/components/listings/ListingChart";
import { ListingDetailResponse } from "@/types/listing";
// import Image from "next/image";
import { formatCurrencyNumber } from "@/utils/formatCurrencyNumber";
import ListingDetailSeller from "./ListingDetailSeller";

export default function ListingDetailBody({
  listing,
}: {
  listing: ListingDetailResponse;
}) {
  const profit = formatCurrencyNumber(listing.financialHighlights.lastFyEBITDA);
  const revenue = formatCurrencyNumber(
    listing.financialHighlights.lastFyRevenue
  );
  const price = formatCurrencyNumber(listing.valuation.askingPrice);
  const avgMonthlyProfit = formatCurrencyNumber(
    listing.financialHighlights.lastFyEBITDA / 12
  );

  return (
    <section className="section listing_detail_body">
      <div className="page_width listing_detail_container">
        <aside id="listing_detail_overview" className="listing_detail">
          <h3>{listing.businessInfo.headline}</h3>

          <div className="listing_detail_save">
            <span>
              <LoactionSvg />
              {listing.businessInfo.location}
            </span>

            <div>
              <span>
                <ViewsSvg />
                2,439
              </span>

              <span>
                <Bookmarks2Svg />
                268
              </span>

              <span>
                <BookmarksSvg />
                Save
              </span>
            </div>
          </div>

          <div className="listing_detail_img">
            <div className="detail_img">
              <div className="cover_photo">
                <span className="move" />
                <img
                  src={listing.mediaAndDocumentation.listingCoverImage.path}
                  alt="listing_cover__photo"
                />
              </div>

              {listing.mediaAndDocumentation.listingImages.length > 0 && (
                <div className="detail_photo">
                  <div className="detail_photo-item">
                    {listing.mediaAndDocumentation.listingImages
                      .slice(0, 2)
                      .map((img) => {
                        return (
                          <div key={img.id}>
                            <span className="move" />
                            <img src={img.path} alt="listing_cover__photo" />
                          </div>
                        );
                      })}
                  </div>

                  {listing.mediaAndDocumentation.listingImages.length >= 4 && (
                    <div className="detail_photo-item">
                      {listing.mediaAndDocumentation.listingImages
                        .slice(2, 4)
                        .map((img) => {
                          return (
                            <div key={img.id}>
                              <span className="move" />
                              <img src={img.path} alt="listing_cover__photo" />
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="listing_detail_tags">
              <div className="tags">
                {/* {listing.tags.map((tag, i) => ( */}
                <span>{listing.businessInfo.industry.name}</span>
                {/* ))} */}
              </div>

              <span
                className={`verification ${
                  listing.visibility === "verified" ? "verified" : "unverified"
                }`}
              >
                <VerifiedSvg />{" "}
                {listing.visibility === "verified" ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          <div
            id="listing_detail_earnings"
            className="listing_detail_valuation"
          >
            <div className="listing_detail_valuation_item">
              <p className="listing_value">
                {listing.financialHighlights.currency}
                {price}
              </p>

              <div>
                <p className="listing_value-desc">Price</p>

                <span>4.5X Revenue | 4.1X Profit</span>
              </div>
            </div>

            <div className="listing_detail_valuation_item">
              <p className="listing_value">
                {listing.financialHighlights.currency}
                {revenue}
              </p>

              <p className="listing_value-desc">Revenue</p>
            </div>

            <div className="listing_detail_valuation_item">
              <p className="listing_value">
                {listing.financialHighlights.currency}
                {profit}
              </p>

              <p className="listing_value-desc">Profit</p>
            </div>

            <div className="listing_detail_valuation_item">
              <p className="listing_value">
                {listing.financialHighlights.currency}
                {avgMonthlyProfit}
              </p>

              <p className="listing_value-desc">Avg. Monthly Profit</p>
            </div>
          </div>

          <div className="listing_about">
            <div className="listing_about-header">
              <p>About the Business</p>

              <ArrowDown />
            </div>

            <div className="listing_about-desc">
              <p>{listing.businessHighlights.executiveSummary}</p>
            </div>
          </div>

          <ListingDetailSeller listing={listing} />

          <ListingChart chartName="Financial Snapshot" />

          <ListingChart id="listing_detail_traffic" chartName="Traffic" />

          <div id="listing_detail_details" className="listing_info">
            <div className="listing_info-item">
              <p>Opportunities</p>

              <ul>
                <li>{listing.businessHighlights.keyGrowthOpportunities}</li>
              </ul>
            </div>

            <span className="line"></span>

            {/* <div className="listing_info-item">
                <p>Risks</p>

                <ul>
                  <li>{listing.businessHighlights.keyGrowthOpportunities}</li>
                </ul>
              </div> */}

            {/* <span className="line"></span> */}

            {/* <div className="listing_info-item">
                <p>Work and Skills Required</p>

                <ul>
                  <li>{listing.businessHighlights.keyGrowthOpportunities}</li>
                </ul>
              </div>

              <span className="line"></span> */}

            <div className="listing_info-item">
              <p>Reason for Sale</p>

              <ul>
                {/* {listing.saleReason.map((reason, i) => ( */}
                <li>{listing.businessHighlights.reasonForSelling}</li>
                {/* ))} */}
              </ul>
            </div>

            <span className="line"></span>

            <div className="listing_info-item">
              <p>Post Acquisition Support</p>

              <ul>
                {/* {listing.postAcquisitionSupport?.map((support, i) => ( */}
                <li>{listing.businessHighlights.postSaleValueOffer}</li>
                {/* ))} */}
              </ul>
            </div>
          </div>
        </aside>

        <ListingDetailSeller listing={listing} />
      </div>
    </section>
  );
}
