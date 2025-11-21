import "@/styles/pages/auth/forgot-password.scss";

import PasswordChangeForm from "../../_components/PasswordChangeForm";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const hash = params.hash as string;

  if (!hash) redirect("/forgot-password");

  return <PasswordChangeForm hash={hash} />;
}
