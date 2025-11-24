import "@/styles/components/listing/listing-detail.scss";

import ListingDetail from "@/components/listings/ListingDetail";
import ListingDetailLoading from "@/components/listings/ListingDetailLoading";
import SimilarListingDetail from "@/components/listings/SimilarListingDetail";
import { ListingDetailProp } from "@/components/listings/types";

import ListingImg1 from "@/public/images/listing-1.jpg";

import ListingDetailImg1 from "@/public/images/listing-detail-1-img.jpg";
import ListingDetailImg2 from "@/public/images/listing-detail-2-img.jpg";
import ListingDetailImg3 from "@/public/images/listing-detail-3-img.jpg";
import ListingDetailImg4 from "@/public/images/listing-detail-4-img.jpg";

import ListingOwnerImg from "@/public/images/listing-owner-img.jpg";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;

  const listing: ListingDetailProp = {
    id: 1,
    image: ListingImg1,
    listingPhotos: [
      ListingDetailImg1,
      ListingDetailImg2,
      ListingDetailImg3,
      ListingDetailImg4,
    ],
    sellerImage: ListingOwnerImg,
    name: "Home Interior Design Items Shop At The City Centre with Parking",
    location: "Cockermouth, Cumbria.",
    tags: ["Retail", "Home Decoration", "Shipping"],
    price: "£48.5K",
    revenue: "£140K",
    profit: "£27K",
    sellerLocation: "Stockport, Greater Manchester.",
    sellerName: "Curtis Miller",
    verification: true,
    avgMonthlyProfit: "£2,120",
    businessStartedDate: "1st of October, 2022",
    aboutBusiness:
      "Sed morbi at fames vitae quis donec. Mi pellentesque amet integer aliquet habitant. Et pellentesque vel urna id pellentesque a sapien posuere lobortis. Sed morbi at fames vitae quis donec. Mi pellentesque amet integer aliquet habitant. Et pellentesque vel urna id pellentesque a sapien posuere lobortis. Sed morbi at fames vitae quis donec. Mi pellentesque amet integer aliquet habitant. Et pellentesque vel urna id pellentesque a sapien posuere lobortis. Sed morbi at fames vitae quis donec. Mi pellentesque amet integer aliquet habitant. Et pellentesque vel urna id pellentesque a sapien posuere lobortis. Sed morbi at fames vitae quis donec. Mi pellentesque amet integer aliquet habitant. Et pellentesque vel urna id pellentesque a sapien posuere lobortis. ",
    opportunities: [
      "Id scelerisque sagittis eget aliquam lectus diam nunc congue.",
      "Morbi tristique ligula volutpat nulla gravida mattis adipiscing. ",
      "Sed et sit consectetur euismod sed. Nulla facilisis tincidunt diam sed.",
    ],
    risks: [
      "Id scelerisque sagittis eget aliquam lectus diam nunc congue.",
      "Morbi tristique ligula volutpat nulla gravida mattis adipiscing. ",
      "Sed et sit consectetur euismod sed. Nulla facilisis tincidunt diam sed.",
    ],
    skillsRequired: [
      "Id scelerisque sagittis eget aliquam lectus diam nunc congue.",
      "Morbi tristique ligula volutpat nulla gravida mattis adipiscing. ",
      "Sed et sit consectetur euismod sed. Nulla facilisis tincidunt diam sed.",
    ],
    saleReason: [
      "Id scelerisque sagittis eget aliquam lectus diam nunc congue.",
      "Morbi tristique ligula volutpat nulla gravida mattis adipiscing. ",
      "Sed et sit consectetur euismod sed. Nulla facilisis tincidunt diam sed.",
    ],
    postAcquisitionSupport: [
      "Id scelerisque sagittis eget aliquam lectus diam nunc congue.",
      "Morbi tristique ligula volutpat nulla gravida mattis adipiscing. ",
      "Sed et sit consectetur euismod sed. Nulla facilisis tincidunt diam sed.",
    ],
  };

  return (
    <>
      <Suspense key={listingId} fallback={<ListingDetailLoading />}>
        <ListingDetail listingId={listingId} listing={listing} />

        {/* <SimilarListingDetail /> */}
      </Suspense>
    </>
  );
}
