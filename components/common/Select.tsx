"use client";

import "@/styles/components/common/select.scss";

import ArrowDown from "@/public/icon/arrow-down.svg";
import React, { useState } from "react";
import { formatCurrencyNumber } from "@/utils/formatCurrencyNumber";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  placeholder?: string;
  defaultPlaceHolder?: string;
  defaultSelectedOption?: string;
  setFormValue: (option: string) => void;
  containerClass?: string;
  optionsClass?: string;
  currency?: boolean;
}

export default function Select({
  options,
  placeholder,
  defaultPlaceHolder,
  defaultSelectedOption,
  setFormValue,
  containerClass,
  optionsClass,
  currency,
  ...props
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function formatCurrency(values: string) {
    const currencyRange = values.split("-").map((price) => parseInt(price));

    const minAskingPrice = formatCurrencyNumber(currencyRange[0]);
    const maxAskingPrice = formatCurrencyNumber(currencyRange[1]);

    return `£${minAskingPrice}-${maxAskingPrice}`;
  }

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

  const currencyPlaceholder =
    selectedOption !== ""
      ? formatCurrency(selectedOption)
      : defaultPlaceHolder
      ? formatCurrency(defaultPlaceHolder)
      : placeholder
      ? placeholder
      : defaultSelectedOption
      ? formatCurrency(defaultSelectedOption)
      : defaultSelectedOption;

  const normalPlaceholder =
    selectedOption !== ""
      ? selectedOption
      : placeholder
      ? placeholder
      : defaultSelectedOption;

  return (
    <div className="select">
      <div
        onClick={() => handleSelect()}
        className={`select_container ${containerClass}`}
      >
        {currency ? currencyPlaceholder : normalPlaceholder}

        <div className="arrow">
          <ArrowDown />
        </div>
      </div>

      <ul className={`custom_select ${optionsClass} ${isOpen && "open"}`}>
        {options.map((option, i) => {
          if (currency) {
            return (
              <li
                className="custom_option currency"
                data-currency={`${formatCurrency(option)}`}
                onClick={handleClickedOption}
                key={i}
              >
                {option}
              </li>
            );
          }

          return (
            <li
              onClick={handleClickedOption}
              className={`custom_option`}
              key={i}
            >
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
