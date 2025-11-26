import "@/styles/pages/searchpage.scss";
import SearchForm from "./_components/SearchForm";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SearchForm />

      {children}
    </main>
  );
}
