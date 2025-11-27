import "@/styles/components/common/skeleton.scss";

import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <section className="section section_listings loading_section">
      <div className="page_width listing_list">
        <Skeleton className="card" />
        <Skeleton className="card" />
        <Skeleton className="card" />
        <Skeleton className="card" />
        <Skeleton className="card" />
        <Skeleton className="card" />
        <Skeleton className="card" />
      </div>
    </section>
  );
}
