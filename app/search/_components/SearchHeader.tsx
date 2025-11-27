"use client";

import Button from "@/components/common/Button";
import SortImg from "@/public/icon/sort.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";

export default function SearchHeader({
  noOfListings,
  industry,
  location,
}: {
  noOfListings: number;
  industry: string | undefined;
  location: string | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState(false);
  function toggleIsVisible() {
    setIsVisible((prev) => (prev ? false : !prev));
  }

  const createPageQueryString = useCallback(
    (value: string) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      urlParams.set("sort", `${value}`);

      return urlParams.toString();
    },
    [searchParams]
  );

  const sortBy = (sortValue: string) => {
    setIsVisible(false);

    const newQueryString = createPageQueryString(sortValue);

    router.push(`${pathname}?${newQueryString}`);
  };

  return (
    <Suspense>
      <section className="section section_header">
        <div className="page_width search_header">
          <h3>
            {industry ? industry : location ? location : "Curated For You"}
          </h3>

          <div className="search_sort">
            <p className="sort_text">
              Showing {noOfListings}+ results sorted by{" "}
              <span>date published</span>
            </p>

            <div className="sort_container">
              <Button
                onClick={toggleIsVisible}
                type="button"
                className="btn btn-secondary btn-small"
              >
                <SortImg />
                SORT BY
              </Button>

              <div className={`${isVisible && "visible"}`}>
                <button onClick={() => sortBy("ASC")} type="button">
                  Ascending
                </button>
                <button onClick={() => sortBy("DESC")} type="button">
                  Descending
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
