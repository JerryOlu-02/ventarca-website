// import Image from "next/image";

import { ListingDetailProp } from "./types/index";

import SmsSvg from "@/public/icon/sms.svg";
import InfoIcon from "@/public/icon/info-icon.svg";
import ArrowRight from "@/public/icon/arrow-right.svg";
import Arrowback from "@/public/icon/arrow-back.svg";
import ArrowDown from "@/public/icon/arrow-down.svg";
import LoactionSvg from "@/public/icon/location.svg";
import ViewsSvg from "@/public/icon/views.svg";
import BookmarksSvg from "@/public/icon/bookmark.svg";
import Bookmarks2Svg from "@/public/icon/bookmark-2.svg";
import VerifiedSvg from "@/public/icon/verified.svg";
import ListingChart from "./ListingChart";
import Button from "../common/Button";
import { getListingDetail } from "@/actions/search";

export default async function ListingDetail({
  listingId,
}: {
  listing?: ListingDetailProp;
  listingId: string;
}) {
  const listingIdProp = parseInt(listingId);
  const listingDetailResponse = await getListingDetail(listingIdProp);

  if (!listingDetailResponse.data) {
    return <section>Could not Fetch Listing</section>;
  }

  const listing = listingDetailResponse.data;

  return (
    <>
      <section className="section listing_detail_menu-section">
        <div className="page_width listing_detail_menu">
          <div className="listing_detail_menu-left">
            <span>
              <Arrowback />
            </span>

            <div>
              <p className="active">Overview</p>
              <p>Earnings</p>
              <p>Traffic</p>
              <p>Details</p>
            </div>
          </div>

          <Button className="btn btn-primary btn-medium">Contact Seller</Button>
        </div>
      </section>

      <section className="section">
        <div className="page_width listing_detail_container">
          {/*  SELLER DETAILS */}

          <aside className="listing_detail">
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

                    {listing.mediaAndDocumentation.listingImages.length >=
                      4 && (
                      <div className="detail_photo-item">
                        {listing.mediaAndDocumentation.listingImages
                          .slice(2, 4)
                          .map((img) => {
                            return (
                              <div key={img.id}>
                                <span className="move" />
                                <img
                                  src={img.path}
                                  alt="listing_cover__photo"
                                />
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
                    listing.progress === "verified" ? "verified" : "unverified"
                  }`}
                >
                  <VerifiedSvg />{" "}
                  {listing.progress === "verified" ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>

            <div className="listing_detail_valuation">
              <div className="listing_detail_valuation_item">
                <p className="listing_value">
                  {listing.financialHighlights.currency}
                  {listing.valuation.askingPrice}
                </p>

                <div>
                  <p className="listing_value-desc">Price</p>

                  <span>4.5X Revenue | 4.1X Profit</span>
                </div>
              </div>

              <div className="listing_detail_valuation_item">
                <p className="listing_value">
                  {listing.financialHighlights.currency}
                  {listing.financialHighlights.lastFyRevenue}
                </p>

                <p className="listing_value-desc">Revenue</p>
              </div>

              <div className="listing_detail_valuation_item">
                <p className="listing_value">
                  {listing.financialHighlights.currency}
                  {listing.financialHighlights.lastFyEBITDA}
                </p>

                <p className="listing_value-desc">Profit</p>
              </div>

              <div className="listing_detail_valuation_item">
                <p className="listing_value">
                  {listing.financialHighlights.currency}
                  {listing.financialHighlights.lastFyEBITDA / 12}
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

            <ListingChart chartName="Financial Snapshot" />

            <ListingChart chartName="Traffic" />

            <div className="listing_info">
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

          {/*  SELLER DETAILS */}
          <aside className="seller_details">
            <div className="seller_details_container">
              <div className="contact_seller">
                <h6>Contact Seller</h6>

                <div className="contact_seller_item">
                  <div className="contact_seller_item_left">
                    <div className="owner_img">
                      {/* {listing.user && (
                        <img
                          src={listing.user.firstName}
                          
                          
                          alt="Listing_Owner__Image"
                        />
                      )} */}
                    </div>

                    <div className="owner_details">
                      <p>
                        {listing.user.firstName} {listing.user.lastName}
                      </p>
                      <p>Business Owner</p>
                      <span>{listing.user.phoneNumber}</span>
                    </div>
                  </div>

                  <SmsSvg />
                </div>
              </div>

              <span className="line" />

              <div className="business_started">
                <h6>Business Started</h6>

                <div className="business_started_item">
                  <div>
                    <p>{listing.businessInfo.dateFounded}</p>
                    <span>(2 years, 11 months old)</span>
                  </div>

                  <InfoIcon />
                </div>
              </div>

              <span className="line" />

              <div className="access_service">
                <h6>Access Services</h6>

                <div className="access_service_item">
                  <div className="access_service_text">
                    <p>Hire a Legal Professional</p>

                    <span>
                      Look through our list of experienced lawyers who can help
                      you through this process.
                    </span>
                  </div>

                  <span className="access_service_btn">
                    <ArrowRight />
                  </span>
                </div>

                <div className="access_service_item">
                  <div className="access_service_text">
                    <p>Hire a Broker</p>

                    <span>
                      Look through our list of brokers who can help you run due
                      diligence on this business.
                    </span>
                  </div>

                  <span className="access_service_btn">
                    <ArrowRight />
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
