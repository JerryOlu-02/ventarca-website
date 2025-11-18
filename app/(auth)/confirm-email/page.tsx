import { confirmEmail } from "@/actions/auth";
import VerificationLayout from "../_components/VerificationLayout";

export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hash = params.hash as string;

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
