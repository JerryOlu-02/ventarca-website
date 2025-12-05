import "@/styles/components/listing/listing-detail.scss";

import ListingDetail from "@/components/listings/ListingDetail";
import ListingDetailLoading from "@/components/listings/ListingDetailLoading";

import { Suspense } from "react";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;

  const userId = (await cookies()).get("user_session_id")?.value;

  return (
    <>
      <Suspense key={listingId} fallback={<ListingDetailLoading />}>
        <ListingDetail listingId={listingId} userId={userId} />
      </Suspense>
    </>
  );
}
