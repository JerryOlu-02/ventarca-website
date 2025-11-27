import "@/styles/pages/searchpage.scss";
import SearchForm from "./_components/SearchForm";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Suspense fallback={<div>Loading</div>}>
        <SearchForm />
      </Suspense>

      {children}
    </main>
  );
}
