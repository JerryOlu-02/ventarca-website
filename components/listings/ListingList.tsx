// import "@/styles/components/listings.scss";
import { ListingCardResponse } from "@/types/listing";
import ListingCard from "./ListingCard";

export default function ListingList({
  listings,
}: {
  listings: ListingCardResponse[];
}) {
  return (
    <>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </>
  );
}
