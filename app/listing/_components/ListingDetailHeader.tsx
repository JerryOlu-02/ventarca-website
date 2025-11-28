"use client";

import Arrowback from "@/public/icon/arrow-back.svg";

import Button from "@/components/common/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListingDetailResponse } from "@/types/listing";

export function ListingDetailHeader({
  scrollToTarget,
  listing,
}: {
  scrollToTarget: (targetId: string) => void;
  listing: ListingDetailResponse;
}) {
  const router = useRouter();
  // "mailto:ventarcahq@gmail.com"

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSectionAndSetActiveIndex = (
    sectionId: string,
    index: number
  ) => {
    scrollToTarget(sectionId);

    setActiveIndex(index);
  };

  return (
    <section className="section listing_detail_menu-section">
      <div className="page_width listing_detail_menu">
        <div className="listing_detail_menu-left">
          <button onClick={() => router.back()} className="back_btn">
            <Arrowback />
          </button>

          <div>
            <button
              onClick={() =>
                scrollToSectionAndSetActiveIndex("listing_detail_overview", 0)
              }
              type="button"
              className={`${activeIndex === 0 && "active"}`}
            >
              Overview
            </button>

            <button
              onClick={() =>
                scrollToSectionAndSetActiveIndex("listing_detail_earnings", 1)
              }
              type="button"
              className={`${activeIndex === 1 && "active"}`}
            >
              Earnings
            </button>

            <button
              onClick={() =>
                scrollToSectionAndSetActiveIndex("listing_detail_traffic", 2)
              }
              type="button"
              className={`${activeIndex === 2 && "active"}`}
            >
              Traffic
            </button>

            <button
              onClick={() =>
                scrollToSectionAndSetActiveIndex("listing_detail_details", 3)
              }
              type="button"
              className={`${activeIndex === 3 && "active"}`}
            >
              Details
            </button>
          </div>
        </div>

        <Button className="btn btn-primary btn-medium">Contact Seller</Button>
      </div>
    </section>
  );
}
