import { Skeleton } from "../ui/skeleton";

export default function ListingDetailLoading() {
  return (
    <div className="h-[700px] sm:flex-col sm:items-center w-[full] flex flex-row justify-center items-center gap-4">
      <Skeleton className="h-[550px] w-[90%] sm:w-[90%]" />
    </div>
  );
}
