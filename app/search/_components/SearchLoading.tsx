import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <section className="section section_listings loading_section">
      <div className="page_width listing_list">
        <Skeleton className="h-[550px] w-[400px] rounded-xl" />
        <Skeleton className="h-[550px] w-[400px] rounded-xl" />
        <Skeleton className="h-[550px] w-[400px] rounded-xl" />
        <Skeleton className="h-[550px] w-[400px] rounded-xl" />
        <Skeleton className="h-[550px] w-[400px] rounded-xl" />
        <Skeleton className="h-[550px] w-[400px] rounded-xl" />
        <Skeleton className="h-[550px] w-[400px] rounded-xl" />
      </div>
    </section>
  );
}
