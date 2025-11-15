import Button from "../common/Button";

export default function NewsletterForm() {
  return (
    <form className="newsletterForm">
      <div>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email Address" />
      </div>

      <Button className="btn btn-primary btn-medium">
        Subscribe to Newsletter
      </Button>
    </form>
  );
}
