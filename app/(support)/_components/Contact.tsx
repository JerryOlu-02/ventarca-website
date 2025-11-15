import Button from "@/components/common/Button";
import Socials from "@/components/common/Socials";

import "@/styles/pages/support/contact.scss";

import HotlineSvg from "@/public/icon/hotline.svg";
import SmsSvg from "@/public/icon/sms.svg";
import EmailSvg from "@/public/icon/email.svg";

export default function Contact() {
  return (
    <>
      <section className="contact_header">
        <div className="overlay-bg-contact" />

        <h2>Contact Us</h2>

        <div className="page_width contact_container">
          <aside className="contact_item_left">
            <div className="contact_item_header">
              <h4>Send us a message</h4>
              <p>
                Do you have a question? A complaint? Or need any help to listing
                or buying <br /> a business. Feel free to contact us.
              </p>
            </div>

            <form className="contact_form">
              <div className="contact_form_item">
                <div>
                  <label>First Name *</label>
                  <input type="text" placeholder="Enter first name" />
                </div>

                <div>
                  <label>Last Name *</label>
                  <input type="text" placeholder="Enter last name" />
                </div>
              </div>

              <div className="contact_form_item">
                <div>
                  <label>Email Address *</label>
                  <input type="email" placeholder="Enter your email address" />
                </div>

                <div>
                  <label>Phone Numnber</label>
                  <input type="number" placeholder="Enter your phone nuber" />
                </div>
              </div>

              <div className="contact_form_item">
                <div>
                  <label>Message</label>
                  <textarea placeholder="Enter your message" />
                </div>
              </div>

              <Button className="btn btn-primary brn-medium">
                Send A Message
              </Button>
            </form>
          </aside>

          <aside className="contact_item_right">
            <h6>Hello! We are always here to help you.</h6>

            <div className="contact_right_list">
              <div className="contact_right_item">
                <HotlineSvg />

                <div>
                  <p>Hotline:</p>

                  <span>+44 (0) 123 456 789</span>
                </div>
              </div>

              <div className="contact_right_item">
                <SmsSvg />

                <div>
                  <p>Hotline:</p>

                  <span>+44 (0) 123 456 789</span>
                </div>
              </div>

              <div className="contact_right_item">
                <EmailSvg />

                <div>
                  <p>Hotline:</p>

                  <span>+44 (0) 123 456 789</span>
                </div>
              </div>
            </div>

            <span className="border_span" />

            <div className="contact_connect">
              <p>Connect with us</p>

              <Socials />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
