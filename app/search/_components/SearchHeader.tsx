import Button from "@/components/common/Button";
import SortImg from "@/public/icon/sort.svg";

export default function SearchHeader({
  noOfListings,
  industry,
  location,
}: {
  noOfListings: number;
  industry: string | undefined;
  location: string | undefined;
}) {
  return (
    <section className="section section_header">
      <div className="page_width search_header">
        <h3>{industry ? industry : location ? location : "Curated For You"}</h3>

        <div className="search_sort">
          <p>
            Showing {noOfListings}+ results sorted by{" "}
            <span>date published</span>
          </p>

          <Button className="btn btn-secondary btn-small">
            <SortImg />
            SORT BY
          </Button>
        </div>
      </div>
    </section>
  );
}
