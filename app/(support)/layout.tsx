import Faqs from "@/components/common/Faqs";
import "@/styles/components/common/Faqs.scss";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}

      <Faqs />
    </main>
  );
}
