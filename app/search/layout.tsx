import "@/styles/pages/searchpage.scss";
import SearchPageForm from "@/components/forms/SearchPageForm";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SearchPageForm />

      {children}
    </main>
  );
}
