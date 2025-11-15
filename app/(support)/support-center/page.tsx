import "@/styles/pages/support/support-center.scss";

import { Ticket } from "@/types";
import SupportContainer from "../_components/SupportContainer";

const tickets: Ticket[] = [
  {
    referenceId: "v1101-E4558",
    status: "open",
    category: "Listing Issues",
    subCategory: "Listing Error",
    email: "charlie@ventarca@gmail.com",
    createdAt: "27 Oct 2025 7:24PM ",
  },
  {
    referenceId: "v1101-E3479",
    status: "closed",
    category: "Listing Issues",
    subCategory: "Listing Error",
    email: "charlie@ventarca@gmail.com",
    createdAt: "27 Oct 2025 7:24PM ",
  },
];

export default function SupportCenter() {
  return (
    <>
      <section className="support_center">
        <div className="overlay-bg-support-center" />

        <h2 className="page_width">Support Center</h2>

        <aside className="page_width support_center_container">
          <SupportContainer tickets={tickets} />
        </aside>
      </section>
    </>
  );
}
