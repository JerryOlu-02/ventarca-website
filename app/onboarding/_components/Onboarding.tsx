"use client";

import Button from "@/components/common/Button";
import OnbordingBg from "@/public/images/onboarding-bg.jpg";
import Image from "next/image";
import ArrowRight from "@/public/icon/arrow-right.svg";
import BuySelection from "@/public/icon/buy-selection.svg";
import SellSelection from "@/public/icon/sell-selection.svg";
import Info from "@/public/icon/info.svg";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Onboarding() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeOption, setActiveOption] = useState<number>(0);

  const handleActiveOption = (i: number) => {
    setActiveOption((previousIndex) =>
      previousIndex === i ? previousIndex : i
    );
  };

  const goToPreferences = () => {
    if (activeOption === 0)
      return router.push(`${pathname}/preferences?option=BUYER`);
    if (activeOption === 1)
      return router.push(`${pathname}/preferences?option=SELLER`);
  };

  return (
    <>
      <div className="onboarding__bg-img">
        <Image src={OnbordingBg} alt="Onboarding_Background" />
      </div>

      <div className="onboarding_container">
        <h4>What would you like to do with Ventarca?</h4>

        <aside className="onboarding_questions">
          <div className="onboarding_options">
            <div
              onClick={() => handleActiveOption(0)}
              className={`onboarding_options-item ${
                activeOption === 0 && "active"
              }`}
            >
              <BuySelection />

              <div>
                <p>I want to buy businesses</p>

                <span>
                  Select this if you are an investor or simply interested in
                  buying a business. Our processes ensure trust and transparency
                  through it all.
                </span>
              </div>
            </div>

            <div
              onClick={() => handleActiveOption(1)}
              className={`onboarding_options-item ${
                activeOption === 1 && "active"
              }`}
            >
              <SellSelection />

              <div>
                <p>I want to sell businesses</p>

                <span>
                  Select this if you are a broker or simply want to sell your
                  business. Our processes are tailored for both new and
                  experienced sellers.
                </span>
              </div>
            </div>
          </div>
        </aside>

        <div className="onboarding_info">
          <Info />

          <p>
            Selecting either doesn’t restrict you from doing the other, it just
            helps us tailor your onboarding experience better.
          </p>
        </div>

        <div className="onboarding_buttons">
          <Button
            onClick={goToPreferences}
            type="button"
            className="btn btn-secondary btn-medium"
          >
            Skip
          </Button>

          <Button
            type="button"
            onClick={goToPreferences}
            className="btn btn-primary btn-medium"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
}
