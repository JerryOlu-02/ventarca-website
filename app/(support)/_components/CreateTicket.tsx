import "@/styles/pages/support/contact.scss";
import Button from "@/components/common/Button";

export default function CreateTicket() {
  return (
    <div className="create_ticket_container">
      <aside className="create_ticket_item_left">
        <div className="create_ticket_item_header">
          <h4>Create Support Ticket</h4>
          <p>Need help? We’re ready to answer your questions 24/7.</p>
        </div>

        <form className="create_ticket_form">
          <div className="create_ticket_form_item">
            <div>
              <label>Email Address *</label>
              <input type="email" placeholder="Enter your email address" />
            </div>

            <div>
              <label>Phone Numnber</label>
              <input type="number" placeholder="Enter your phone nuber" />
            </div>
          </div>

          <div className="create_ticket_form_item">
            <div>
              <label>Category *</label>
              <input type="email" placeholder="Enter your email address" />
            </div>

            <div>
              <label>Subcategory *</label>
              <input type="number" placeholder="Enter your phone nuber" />
            </div>
          </div>

          <div className="contact_form_item">
            <div>
              <label>Message</label>
              <textarea placeholder="Enter your message" />
            </div>
          </div>

          <div className="create_ticket_form_item">
            <div>
              <label htmlFor="file-upload">Attachments</label>
              <input type="file" id="file-upload" />
            </div>
          </div>

          <Button className="btn btn-primary brn-medium">Send A Message</Button>
        </form>
      </aside>
    </div>
  );
}
