import { getListingDetail } from "@/actions/search";
import ListingDetailWrapper from "@/app/listing/_components/ListingDetailWrapper";
import { getSimilarListings } from "@/utils/getHandpickedListings";
import SimilarListingDetail from "./SimilarListingDetail";

export default async function ListingDetail({
  listingId,
  userId,
}: {
  listingId: string;
  userId?: string;
}) {
  const listingIdProp = parseInt(listingId);
  const userIdProp = userId ? parseInt(userId) : undefined;

  const listingDetailResponse = await getListingDetail(
    listingIdProp,
    userIdProp
  );

  if (!listingDetailResponse.data) {
    return (
      <section className="section page_width">Could not Fetch Listing</section>
    );
  }

  const listing = listingDetailResponse.data;

  const similarListingPromise = getSimilarListings(
    listing.businessInfo.industry.name
  );

  return (
    <>
      <ListingDetailWrapper listing={listing} />

      <SimilarListingDetail similarListingPromise={similarListingPromise} />
    </>
  );
}
