import Logo from "@/public/logo.svg";

import Button from "../common/Button";
import Socials from "../common/Socials";

export default function Footer() {
  return (
    <section className="section section_footer">
      <div className="page_width footer">
        <div className="footer_logo-section container">
          <aside>
            <Logo />

            <p>
              Empowering entrepreneurs, investors, and
              <br /> brokers to buy and sell businesses with
              <br /> clarity, speed, and trust.
            </p>
          </aside>

          <span />

          <Socials />
        </div>

        <div className="footer_links-section container">
          <h6>Company</h6>

          <div>
            <ul className="footer_links">
              <li>About Us</li>
              <li>Careers</li>
              <li>Data Protection</li>
              <li>Help Center</li>
            </ul>

            <ul className="footer_links">
              <li>Pricing</li>
              <li>FAQs</li>
              <li>Resources</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="footer_links-section container">
          <h6>Actions</h6>

          <ul className="footer_links">
            <li>Buy a Business</li>
            <li>Sell a Business</li>
            <li>Partners and Press</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer_news container">
          <h6>Join our newsletter</h6>

          <div className="form">
            <p>
              Get insights on valuations, deal-making tips, and
              <br /> the latest listings directly to your inbox.
            </p>

            <input placeholder="Enter your email address..." type="email" />

            <Button className="btn btn-primary btn-small">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
