"use client";

import PreferencesBg from "@/public/images/preferences-bg.jpg";

import ArrowRight from "@/public/icon/arrow-right.svg";
import SuccessSvg from "@/public/icon/success-small.svg";

import Button from "@/components/common/Button";
import Image from "next/image";
import { industriesFake } from "@/utils/arrays";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { onboardUser } from "@/utils/onboardUser";
import { useRouter } from "next/navigation";

export default function Preferences({ preference }: { preference: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const toggleModal = (value: boolean, message: string) => {
    setIsSubmitted(value);
    setMessage(message);
  };

  return (
    <>
      <PrefrencesContainer preference={preference} toggleModal={toggleModal} />

      <PreferencesSuccessful
        className={isSubmitted ? "visible" : ""}
        message={message}
      />
    </>
  );
}

function PrefrencesContainer({
  toggleModal,
  preference,
}: {
  preference: string;
  toggleModal: (value: boolean, message: string) => void;
}) {
  const router = useRouter();
  const { industries } = useAuth();

  // ARRAY OF INDUSTRIES A USER SELECTS
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ADD INDUSTRY TO THE ARRAY A SELECTED INUSTRY
  const addIndustry = function (industry: string) {
    setSelectedIndustries((previousIndustries) =>
      previousIndustries.includes(industry)
        ? previousIndustries
        : [...previousIndustries, industry]
    );
  };

  // REMOVE INDUSTRY FROM THE ARRAY A SELECTED INUSTRY
  const removeIndustry = function (industry: string) {
    setSelectedIndustries((previousIndustries) => {
      const selectedIndex = previousIndustries.findIndex(
        (value) => value === industry
      );

      return previousIndustries.includes(industry)
        ? [
            ...previousIndustries.slice(0, selectedIndex),
            ...previousIndustries.slice(selectedIndex + 1),
          ]
        : previousIndustries;
    });
  };

  // SUBMIT PREFERENCES
  const submitPrefrences = async () => {
    setIsLoading(true);

    const response = await onboardUser(preference, selectedIndustries);

    setIsLoading(false);

    // SHOW MODAL THEN REDIRECT TO HOMEPAGE
    if (response.success) {
      toggleModal(true, "Your Prefrences has been Submitted successfully");

      setTimeout(() => {
        toggleModal(false, "Your Prefrences has been Submitted successfully");
        router.push("/");
      }, 3000);

      return;
    }

    toggleModal(true, `${response.error}`);
  };

  const skipPrefrences = async () => {
    setIsLoading(true);

    const response = await onboardUser(preference, []);

    setIsLoading(false);

    // SHOW MODAL THEN REDIRECT TO HOMEPAGE
    if (response.success) {
      toggleModal(true, "Your Prefrences has been Submitted successfully");

      setTimeout(() => {
        toggleModal(false, "Your Prefrences has been Submitted successfully");
        router.push("/");
      }, 3000);

      return;
    }

    toggleModal(true, `${response.error}`);

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <>
      <div className="onboarding__bg-img">
        <Image src={PreferencesBg} alt="Preferences_Background" />
      </div>

      <div className="onboarding_container">
        <h4>
          What industries are you interested in?
          <span>Select all that apply</span>
        </h4>

        <div className="onboarding_industries">
          {industries
            ? industries.map((industry, i) => {
                return (
                  <PreferencesItem
                    addIndustry={() => addIndustry(industry.toLowerCase())}
                    removeIndustry={() =>
                      removeIndustry(industry.toLowerCase())
                    }
                    industry={industry}
                    key={i}
                  />
                );
              })
            : industriesFake.map((industry, i) => {
                return (
                  <PreferencesItem
                    addIndustry={() => addIndustry(industry.toLowerCase())}
                    removeIndustry={() =>
                      removeIndustry(industry.toLowerCase())
                    }
                    industry={industry}
                    key={i}
                  />
                );
              })}
        </div>

        <div className="onboarding_buttons">
          <Button
            disabled={isLoading}
            onClick={skipPrefrences}
            type="button"
            className="btn btn-secondary btn-medium"
          >
            Skip
          </Button>

          <Button
            disabled={isLoading}
            onClick={submitPrefrences}
            type="button"
            className="btn btn-primary btn-medium"
          >
            <span className="loader" />
            Next <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
}

function PreferencesItem({
  industry,
  addIndustry,
  removeIndustry,
}: {
  industry: string;
  addIndustry: () => void;
  removeIndustry: () => void;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActive) {
      addIndustry();
    } else {
      removeIndustry();
    }
  }, [isActive]);

  const handleClickedOption = function (industry: string) {
    setIsActive((isPreviouslyActive) => (isPreviouslyActive ? false : true));
  };

  return (
    <span
      onClick={() => handleClickedOption(industry)}
      className={`${isActive && "active"}`}
    >
      {industry}
    </span>
  );
}

function PreferencesSuccessful({
  message,
  className,
}: {
  message: string;
  className: string;
}) {
  return (
    <div className={`preferences_successful_container ${className}`}>
      <span className="bar" />

      <SuccessSvg />

      <p>{message}</p>
    </div>
  );
}
