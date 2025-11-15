"use client";

import Button from "@/components/common/Button";
import { useState } from "react";
import CreateTicket from "./CreateTicket";
import ViewTickets from "./ViewTickets";
import { Ticket } from "@/types";

export default function SupportContainer({ tickets }: { tickets: Ticket[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleActiveButton = (i: number) => {
    setActiveIndex((previousIndex) =>
      previousIndex === i ? previousIndex : i
    );
    console.log(activeIndex);
  };

  return (
    <>
      <div className="support_buttons">
        <Button
          onClick={() => handleActiveButton(0)}
          className={`btn btn-medium ${
            activeIndex === 0 ? "btn-primary" : "btn-secondary"
          }`}
        >
          Create Support Ticket
        </Button>

        <Button
          onClick={() => handleActiveButton(1)}
          className={`btn btn-medium ${
            activeIndex === 1 ? "btn-primary" : "btn-secondary"
          }`}
        >
          View My Tickets
        </Button>
      </div>

      {activeIndex === 0 ? <CreateTicket /> : <ViewTickets tickets={tickets} />}
    </>
  );
}
