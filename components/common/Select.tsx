"use client";

import "@/styles/components/common/select.scss";
import ArrowDown from "@/public/icon/arrow-down.svg";
import { useRef, useState } from "react";

interface SelectProps {
  options: string[];
  placeholder: string;
}

export default function Select({ options, placeholder }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef(null);

  const handleSelect = function () {
    // if (selectRef.current) {
    //   console.log(selectRef);
    // }

    setIsOpen((isPreviouslyOpen) =>
      isPreviouslyOpen ? false : !isPreviouslyOpen
    );
  };

  return (
    <div onClick={() => handleSelect()} className="select_container">
      {placeholder}

      <div className="arrow">
        <ArrowDown />
      </div>

      <ul ref={selectRef} className={`custom_select ${!isOpen && "open"}`}>
        {options.map((option, i) => {
          return (
            <li className="custom_option" key={i}>
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
