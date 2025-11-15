import { Ticket } from "@/types";

export default function ViewTickets({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="view_ticket_container">
      <h4>My Tickets (${tickets.length})</h4>

      <aside className="view_tickets">
        <div>
          <span></span>

          <p>Reference ID</p>

          <p>Status</p>

          <p>Category</p>

          <p>Subcategory</p>

          <p>Email Address</p>

          <p>Created At</p>
        </div>

        {tickets.map((ticket, index) => {
          return (
            <div className="ticket_item" key={ticket.referenceId}>
              <span>{index + 1}</span>

              <p>{ticket.referenceId}</p>

              <p className={`${ticket.status === "open" ? "open" : "closed"}`}>
                {ticket.status}
              </p>

              <p>{ticket.category}</p>

              <p>{ticket.subCategory}</p>

              <p>{ticket.email}</p>

              <p>{ticket.createdAt}</p>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
