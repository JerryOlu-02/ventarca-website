"use client";

import { ListingDetailResponse } from "@/types/listing";
import ListingDetailBody from "./ListingDetailBody";
import { ListingDetailHeader } from "./ListingDetailHeader";

export default function ListingDetailWrapper({
  listing,
}: {
  listing: ListingDetailResponse;
}) {
  const scrollToTarget = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start",
      });
    }
  };

  return (
    <>
      <ListingDetailHeader listing={listing} scrollToTarget={scrollToTarget} />

      <ListingDetailBody listing={listing} />
    </>
  );
}
