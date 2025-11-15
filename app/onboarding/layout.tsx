import "@/styles/pages/onboarding/onboarding.scss";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section className="section onboarding_section">{children}</section>
    </main>
  );
}
