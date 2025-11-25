import "@/styles/components/listing/listing-detail.scss";

import ListingDetail from "@/components/listings/ListingDetail";
import ListingDetailLoading from "@/components/listings/ListingDetailLoading";

import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;

  return (
    <>
      <Suspense key={listingId} fallback={<ListingDetailLoading />}>
        <ListingDetail listingId={listingId} />
      </Suspense>
    </>
  );
}
