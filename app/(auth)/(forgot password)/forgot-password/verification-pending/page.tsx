import VerificationLayout from "@/app/(auth)/_components/VerificationLayout";

export default function Page() {
  return (
    <VerificationLayout
      header="Password Reset Email Sent"
      content="A password reset email has been sent to you. Click the link in your email to change your password and access your account."
    />
  );
}
