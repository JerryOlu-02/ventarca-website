import Searchpage from "./_components/Searchpage";
import { Suspense } from "react";
import SearchLoading from "./_components/SearchLoading";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const location = params.location as string | undefined;

  const industry = params.industry as string | undefined;

  const priceRange = params.priceRange as string | undefined;

  const sort = params.sort as string | undefined;

  const page = params.page as string | undefined;

  const filters = params.filters as string | undefined;

  const suspenseKey = JSON.stringify(params);

  return (
    <Suspense key={suspenseKey} fallback={<SearchLoading />}>
      <Searchpage
        page={page}
        priceRange={priceRange}
        industry={industry}
        location={location}
        sort={sort}
      />
    </Suspense>
  );
}
