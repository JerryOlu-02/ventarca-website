import { ListingDetailResponse } from "@/types/listing";
import Image from "next/image";

import { getAge, getFormattedDate } from "@/utils/formatDate";

import SmsSvg from "@/public/icon/sms.svg";
import InfoIcon from "@/public/icon/info-icon.svg";
import ArrowRight from "@/public/icon/arrow-right.svg";

import NoUserImg from "@/public/images/no-user-img.png";

export default function ListingDetailSeller({
  listing,
}: {
  listing: ListingDetailResponse;
}) {
  const listingDateFounded = getFormattedDate(listing.businessInfo.dateFounded);
  const listingAge = getAge(listing.businessInfo.dateFounded);

  return (
    <aside className="seller_details">
      <div className="seller_details_container">
        <div className="contact_seller">
          <h6>Contact Seller</h6>

          <div className="contact_seller_item">
            <div className="contact_seller_item_left">
              <div className="owner_img">
                {listing.user?.photo ? (
                  <img
                    src={listing.user.photo.path}
                    alt="Listing_Owner__Image"
                  />
                ) : (
                  <Image
                    src={NoUserImg}
                    alt="No_USER_IMAGE"
                    width={50}
                    height={50}
                  />
                )}
              </div>

              <div className="owner_details">
                <p>
                  {listing.user?.firstName} {listing.user?.lastName}
                </p>
                <p>Business Owner</p>
                <span>{listing.user?.phoneNumber}</span>
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
              <p>{listingDateFounded}</p>
              <span>({listingAge})</span>
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
                Look through our list of experienced lawyers who can help you
                through this process.
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
  );
}
