import { confirmEmail } from "@/actions/auth";
import VerificationLayout from "../_components/VerificationLayout";
import { redirect } from "next/navigation";

export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hash = params.hash as string;

  if (!hash) redirect("/login");

  const { success, error } = await confirmEmail(hash);

  return (
    <>
      {success && (
        <VerificationLayout header="Email Verified" content={success} />
      )}

      {error && (
        <VerificationLayout
          header="Email has aleady been verified"
          content={error}
        />
      )}
    </>
  );
}
