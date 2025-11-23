// import "@/styles/components/listings.scss";
import ListingCard from "./ListingCard";
import { Listing } from "./types/index";

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
