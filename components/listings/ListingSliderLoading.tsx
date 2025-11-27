import "@/styles/components/common/skeleton.scss";

import { Skeleton } from "../ui/skeleton";

export default function ListingSliderLoading() {
  return (
    <div className="listing_slider_loading">
      <Skeleton className="card" />
      <Skeleton className="card" />
      <Skeleton className="card" />
    </div>
  );
}
