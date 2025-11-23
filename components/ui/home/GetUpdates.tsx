"use client";

import NewsletterForm from "@/components/forms/NewsletterForm";
import { useRef } from "react";

// GET UPDATES SECTION
export default function GetUpdates({ ref }: { ref: React.Ref<HTMLElement> }) {
  return (
    <section ref={ref} className="getUpdates_section">
      <div className="getUpdates">
        <div className="getUpdates_header">
          <h2>Get Updates on Trending Markets</h2>
          <p>
            Facilisis volutpat tempor nunc ut dictum quis. Orci venenatis in
            amet non sed arcu nullam ut.
          </p>
        </div>

        <NewsletterForm />
      </div>
    </section>
  );
}
