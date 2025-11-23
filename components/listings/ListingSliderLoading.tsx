import { Skeleton } from "../ui/skeleton";

export default function ListingSliderLoading() {
  return (
    <div className="flex gap-4 overflow-scroll">
      <Skeleton className="h-[550px] w-[450px] rounded-xl" />
      <Skeleton className="h-[550px] w-[450px] rounded-xl" />
      <Skeleton className="h-[550px] w-[450px] rounded-xl" />
    </div>
  );
}
