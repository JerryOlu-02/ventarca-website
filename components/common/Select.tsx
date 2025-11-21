"use client";

import "@/styles/components/common/select.scss";
import ArrowDown from "@/public/icon/arrow-down.svg";
import React, { useState } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  placeholder?: string;
  defaultSelectedOption?: string;
  setFormValue: (option: string) => void;
  containerClass?: string;
  optionsClass?: string;
}

export default function Select({
  options,
  placeholder,
  defaultSelectedOption,
  setFormValue,
  containerClass,
  optionsClass,
  ...props
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = function () {
    setIsOpen((isPreviouslyOpen) =>
      isPreviouslyOpen ? false : !isPreviouslyOpen
    );
  };

  const handleClickedOption = function (e: React.MouseEvent<HTMLLIElement>) {
    // onClickOption(e);
    setSelectedOption(e.currentTarget.innerText);

    setIsOpen(false);

    setFormValue(e.currentTarget.innerHTML);
  };

  return (
    <div className="select">
      <div
        onClick={() => handleSelect()}
        className={`select_container ${containerClass}`}
      >
        {selectedOption !== ""
          ? selectedOption
          : placeholder
          ? placeholder
          : defaultSelectedOption}

        <div className="arrow">
          <ArrowDown />
        </div>
      </div>

      <ul className={`custom_select ${optionsClass} ${isOpen && "open"}`}>
        {options.map((option, i) => {
          return (
            <li onClick={handleClickedOption} className="custom_option" key={i}>
              {option}
            </li>
          );
        })}
      </ul>

      <select {...props}>
        <option value=""></option>

        {options.map((option, i) => {
          return (
            <option value={option} key={i}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
