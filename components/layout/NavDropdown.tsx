import { HTMLAttributes } from "react";

interface NavDropdownProps extends HTMLAttributes<HTMLDivElement> {
  items: string[];
}

export default function NavDropdown({
  items,
  className,
  ...props
}: NavDropdownProps) {
  return (
    <div {...props} className={className}>
      {items.map((item) => (
        <div className="dropdown_item" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}
