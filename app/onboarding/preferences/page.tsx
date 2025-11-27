import { redirect } from "next/navigation";
import Preferences from "../_components/Preferences";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const preference = params.option as string | undefined;

  const expectedStrings = ["BUYER", "SELLER"];

  if (!preference) {
    redirect("/onboarding");
  } else if (!expectedStrings.includes(preference)) {
    redirect("/onboarding");
  }

  return <Preferences preference={preference} />;
}
