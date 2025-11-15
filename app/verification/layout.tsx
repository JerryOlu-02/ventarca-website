import "@/styles/pages/verification/verification.scss";

export default function VerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section className="section verification_section">{children}</section>
    </main>
  );
}
