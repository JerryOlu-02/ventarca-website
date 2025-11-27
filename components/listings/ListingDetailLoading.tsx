import "@/styles/components/common/skeleton.scss";

import { Skeleton } from "../ui/skeleton";

export default function ListingDetailLoading() {
  return (
    <div className="listing_detail_loading">
      <Skeleton className="card" />
      <Skeleton className="card" />
    </div>
  );
}
