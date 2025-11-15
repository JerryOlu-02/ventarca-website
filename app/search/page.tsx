import Searchpage from "./_components/Searchpage";
import "@/styles/pages/searchpage.scss";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  console.log(params);

  return <main>{<Searchpage />}</main>;
}
