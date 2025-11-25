import { getListingDetail } from "@/actions/search";
import ListingDetailWrapper from "@/app/listing/_components/ListingDetailWrapper";
import { getSimilarListings } from "@/utils/getHandpickedListings";
import SimilarListingDetail from "./SimilarListingDetail";

export default async function ListingDetail({
  listingId,
}: {
  listingId: string;
}) {
  const listingIdProp = parseInt(listingId);
  const listingDetailResponse = await getListingDetail(listingIdProp);

  if (!listingDetailResponse.data) {
    return <section>Could not Fetch Listing</section>;
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
