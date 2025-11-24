"use client";

import PreferencesBg from "@/public/images/preferences-bg.jpg";

import ArrowRight from "@/public/icon/arrow-right.svg";

import Button from "@/components/common/Button";
import Image from "next/image";
import { industriesFake } from "@/utils/arrays";

import { useState, useEffect } from "react";

export default function Preferences() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const addIndustry = function (industry: string) {
    setSelectedIndustries((previousIndustries) =>
      previousIndustries.includes(industry)
        ? previousIndustries
        : [...previousIndustries, industry]
    );
  };

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
          {industriesFake.map((industry, i) => {
            return (
              <PreferencesItem
                addIndustry={() => addIndustry(industry)}
                removeIndustry={() => removeIndustry(industry)}
                industry={industry}
                key={i}
              />
            );
          })}
        </div>

        <div className="onboarding_buttons">
          <Button className="btn btn-secondary btn-medium">Skip</Button>

          <Button className="btn btn-primary btn-medium">
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
