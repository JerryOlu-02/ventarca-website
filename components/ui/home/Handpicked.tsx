import Link from "next/link";

// HANDPICKED SECTION
export default function Handpicked({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <div className="page_width handpicked">
        <aside className="handpicked_header">
          <h2>Handpicked for Your Next Move</h2>

          <p>
            Discover high-potential businesses vetted and ready for acquisition.
          </p>
        </aside>

        {children}

        <Link href="/search" className="btn btn-secondary btn-medium">
          View More Listings
        </Link>
      </div>
    </section>
  );
}
