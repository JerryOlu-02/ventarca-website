import { searchListing } from "@/actions/search";
import Searchpage from "./_components/Searchpage";
import "@/styles/pages/searchpage.scss";
import { SearchInput } from "@/utils/types/searchSchema";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  await searchListing(params as SearchInput);

  return <main>{<Searchpage />}</main>;
}
