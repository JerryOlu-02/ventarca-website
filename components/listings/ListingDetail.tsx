import "@/styles/components/listing/listing-detail.scss";

import Image from "next/image";

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

export default function ListingDetail({
  listing,
}: {
  listing: ListingDetailProp;
}) {
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
          {/*  BUYER DETAILS */}

          <aside className="listing_detail">
            <h3>{listing.name}</h3>

            <div className="listing_detail_save">
              <span>
                <LoactionSvg />
                {listing.location}
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
                  <Image src={listing.image} alt="listing_cover__photo" />
                </div>

                <div className="detail_photo">
                  {listing.listingPhotos?.map((img, i) => (
                    <div key={i}>
                      <Image src={img} alt="listing_cover__photo" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="listing_detail_tags">
                <div className="tags">
                  {listing.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>

                <span
                  className={`verification ${
                    listing.verification ? "verified" : "unverified"
                  }`}
                >
                  <VerifiedSvg />{" "}
                  {listing.verification ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>

            <div className="listing_detail_valuation">
              <div className="listing_detail_valuation_item">
                <p className="listing_value">{listing.price}</p>

                <div>
                  <p className="listing_value-desc">Price</p>

                  <span>4.5X Revenue | 4.1X Profit</span>
                </div>
              </div>

              <div className="listing_detail_valuation_item">
                <p className="listing_value">{listing.revenue}</p>

                <p className="listing_value-desc">Revenue</p>
              </div>

              <div className="listing_detail_valuation_item">
                <p className="listing_value">{listing.profit}</p>

                <p className="listing_value-desc">Profit</p>
              </div>

              <div className="listing_detail_valuation_item">
                <p className="listing_value">{listing.avgMonthlyProfit}</p>

                <p className="listing_value-desc">Avg. Monthly Profit</p>
              </div>
            </div>

            <div className="listing_about">
              <div className="listing_about-header">
                <p>About the Business</p>

                <ArrowDown />
              </div>

              <div className="listing_about-desc">
                <p>{listing.aboutBusiness}</p>
              </div>
            </div>

            <ListingChart chartName="Financial Snapshot" />

            <ListingChart chartName="Traffic" />

            <div className="listing_info">
              <div className="listing_info-item">
                <p>Opportunities</p>

                <ul>
                  {listing.opportunities.map((opportunity, i) => (
                    <li key={i}>{opportunity}</li>
                  ))}
                </ul>
              </div>

              <span className="line"></span>

              <div className="listing_info-item">
                <p>Risks</p>

                <ul>
                  {listing.risks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>

              <span className="line"></span>

              <div className="listing_info-item">
                <p>Work and Skills Required</p>

                <ul>
                  {listing.skillsRequired.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>

              <span className="line"></span>

              <div className="listing_info-item">
                <p>Reason for Sale</p>

                <ul>
                  {listing.saleReason.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>

              <span className="line"></span>

              <div className="listing_info-item">
                <p>Post Acquisition Support</p>

                <ul>
                  {listing.postAcquisitionSupport?.map((support, i) => (
                    <li key={i}>{support}</li>
                  ))}
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
                      {listing.sellerImage && (
                        <Image
                          src={listing.sellerImage}
                          alt="Listing_Owner__Image"
                        />
                      )}
                    </div>

                    <div className="owner_details">
                      <p>{listing.sellerName}</p>
                      <p>Business Owner</p>
                      <span>{listing.sellerLocation}</span>
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
                    <p>{listing.businessStartedDate}</p>
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
