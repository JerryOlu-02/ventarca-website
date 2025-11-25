"use client";

import "@/styles/components/common/modal.scss";
import Success from "@/public/icon/success-newletter-modal.svg";
import Failed from "@/public/icon/failed-newsletter-modal.svg";
import Close from "@/public/icon/close-newsletter-modal.svg";
import { useEffect, useRef, useState } from "react";
// import { useEffect } from "react";
// import useFormDataContext from "../helpers/useFormContext";

export default function Modal({
  failedMessage,
  success,
}: {
  failedMessage?: string;
  success: boolean;
}) {
  const [isModalHidden, setIsModalHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const removeOverlay = function () {
      if (!containerRef.current) return;

      if (containerRef.current.classList.contains("popup")) return;

      setIsModalHidden(true);
    };

    document.addEventListener("click", removeOverlay);

    return () => document.removeEventListener("click", removeOverlay);
  }, []);

  const handleClose = () => {
    setIsModalHidden(true);
  };

  return (
    <div
      ref={containerRef}
      className={`overlay ${isModalHidden ? "hidden" : ""}`}
    >
      <div className="popup">
        {success ? <Success /> : <Failed />}

        <h3>
          {success ? "Email Added Successfully" : "Could Not Add To Newsletter"}
        </h3>

        <p>
          {success
            ? "You’re in! Stay tuned for Ventarca’s launch and enjoy 3 months free as our thank you."
            : failedMessage}
        </p>

        <span onClick={() => handleClose()} className="close">
          <Close />
        </span>
      </div>
    </div>
  );
}
