"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";

export default function SearchPagination({
  noOfListings,
  currentSelectedPage,
}: {
  noOfListings: number;
  currentSelectedPage: number | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentNoOfPages = Math.ceil(noOfListings / 9);

  const noOfPages: number[] = new Array();
  for (let index = 0; index < currentNoOfPages; index++) {
    noOfPages.push(index + 1);
  }
  //   console.log("pages", noOfPages);

  const createPageQueryString = useCallback(
    (value: number) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      urlParams.set("page", `${value}`);

      return urlParams.toString();
    },
    [searchParams]
  );

  const goToPage = (pageNo: number) => {
    if (pageNo < 1) return;
    if (pageNo > currentNoOfPages) return;

    const newQueryString = createPageQueryString(pageNo);

    router.push(`${pathname}?${newQueryString}`);
  };

  const goToNext = () => {
    if (!currentSelectedPage) return;

    goToPage(currentSelectedPage + 1);
  };

  const goToPrev = () => {
    if (!currentSelectedPage) return;

    goToPage(currentSelectedPage - 1);
  };

  return (
    currentNoOfPages > 1 && (
      <section className="section pagination_section">
        <div className="page_width pagination_container">
          {currentSelectedPage && (
            <div className="pagination">
              {currentSelectedPage === 1 ? null : (
                <button onClick={() => goToPrev()} className="pagination_btn">
                  Prev
                </button>
              )}

              {/* DISPLAY FIRST PAGE WHEN THE CURRENT SELECTED PAGE IS NOT 1 AND THE TOTAL NUMBER OF PAGES IS NOT 1 */}
              {currentSelectedPage === 1
                ? null
                : currentNoOfPages === 1
                ? null
                : noOfPages.slice(0, 1).map((pageNo) => (
                    <button
                      type="button"
                      key={pageNo}
                      onClick={() => goToPage(pageNo)}
                      className={`pagination_btn ${
                        pageNo === currentSelectedPage && "active"
                      }`}
                    >
                      {pageNo}
                    </button>
                  ))}

              {currentSelectedPage === 1 ? null : currentNoOfPages ===
                currentSelectedPage ? (
                <button type="button" className="pagination_btn">
                  ...
                </button>
              ) : null}

              {/* DISPLAY PAGE BEFORE ACTIVE PAGE IF THE CURRENT ACTIVE PAGE IS NOT 2 */}
              {currentSelectedPage === 2
                ? null
                : noOfPages
                    .slice(currentSelectedPage - 2, currentSelectedPage - 1)
                    .map((pageNo) => (
                      <button
                        type="button"
                        key={pageNo}
                        onClick={() => goToPage(pageNo)}
                        className={`pagination_btn ${
                          pageNo === currentSelectedPage && "active"
                        }`}
                      >
                        {pageNo}
                      </button>
                    ))}

              {/* DISPLAY ACTIVE PAGE */}
              {noOfPages
                .slice(currentSelectedPage - 1, currentSelectedPage)
                .map((pageNo) => (
                  <button
                    type="button"
                    key={pageNo}
                    onClick={() => goToPage(pageNo)}
                    className={`pagination_btn ${
                      pageNo === currentSelectedPage && "active"
                    }`}
                  >
                    {pageNo}
                  </button>
                ))}

              {/* DISPLAY PAGE AFTER ACTIVE PAGE IF THE CURRENT ACTIVE PAGE IS NOT 1 and No OF PAGES IS NOT 2 */}
              {currentSelectedPage == 1 && currentNoOfPages === 1
                ? null
                : currentNoOfPages === 2
                ? null
                : currentNoOfPages > 2 &&
                  currentSelectedPage === currentNoOfPages - 1
                ? null
                : noOfPages
                    .slice(currentSelectedPage, currentSelectedPage + 1)
                    .map((pageNo) => (
                      <button
                        type="button"
                        key={pageNo}
                        onClick={() => goToPage(pageNo)}
                        className={`pagination_btn ${
                          pageNo === currentSelectedPage && "active"
                        }`}
                      >
                        {pageNo}
                      </button>
                    ))}

              {/* DISPLAY MORE ... ICON WHEN THE SELECTED PAGE IS NOT THE SAME AS THE CURRENT NUMBER OF PAGES */}
              {currentNoOfPages === currentSelectedPage ? null : (
                <button type="button" className="pagination_btn">
                  ...
                </button>
              )}

              {/* DISPLAY LAST PAGE WHEN CURRENT NO OF PAGES IS NOT 1 AND WHEN CURRENT SELECTED PAGE IS NOT EQUAL TO THE CURRENT NUMBER OF PAGES */}
              {currentNoOfPages == 1
                ? null
                : currentSelectedPage === currentNoOfPages
                ? null
                : noOfPages.slice(-1).map((pageNo) => (
                    <button
                      type="button"
                      key={pageNo}
                      onClick={() => goToPage(pageNo)}
                      className={`pagination_btn ${
                        pageNo === currentSelectedPage && "active"
                      }`}
                    >
                      {pageNo}
                    </button>
                  ))}

              {currentSelectedPage === currentNoOfPages ? null : (
                <button
                  onClick={() => goToNext()}
                  type="button"
                  className="pagination_btn"
                >
                  Next
                </button>
              )}
            </div>
          )}

          <p className="sort_text">
            Showing {noOfListings}+ results sorted by{" "}
            <span>date published</span>
          </p>
        </div>
      </section>
    )
  );
}
