"use client";

import Logo from "@/public/logo.svg";
import LogoMobile from "@/public/icon/logo-mobile.svg";

import "@/styles/layout/footer.scss";

import Button from "../common/Button";
import Socials from "../common/Socials";
import { SubmitHandler, useForm } from "react-hook-form";
import { subscribeToNewsLetter } from "@/actions/newsletter";
import { useState } from "react";

type FooterInput = {
  email: string;
};

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState<string | null>(null);
  const [isSuccessMessage, setIsSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FooterInput>();

  const subscribeOnSubmit: SubmitHandler<FooterInput> = async (data) => {
    setIsLoading(true);

    const response = await subscribeToNewsLetter(data.email);

    if (!response.ok) {
      setIsErrorMessage(response.errorMessage);

      setTimeout(() => {
        setIsErrorMessage(null);
      }, 10000);
    } else {
      reset();

      setIsSuccessMessage("You have successfully subscribed To Our Newsletter");

      setTimeout(() => {
        setIsSuccessMessage(null);
      }, 10000);
    }

    setIsLoading(false);
  };

  return (
    <section className="section section_footer">
      <div className="page_width footer">
        <div className="footer_logo-section container">
          <aside>
            <Logo />

            <LogoMobile />

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

          <form onSubmit={handleSubmit(subscribeOnSubmit)} className="form">
            <p>
              Get insights on valuations, deal-making tips, and
              <br /> the latest listings directly to your inbox.
            </p>

            <input
              {...register("email", { required: true })}
              placeholder="Enter your email address..."
              type="email"
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary btn-small"
            >
              <span className="loader" />
              Subscribe to Newsletter
            </Button>

            {isErrorMessage && <p className="error">{isErrorMessage}</p>}
            {isSuccessMessage && <p className="success">{isSuccessMessage}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
