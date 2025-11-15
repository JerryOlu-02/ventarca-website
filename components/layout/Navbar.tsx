import Logo from "@/public/logo.svg";
// import Image from "next/image";
// import Button from "../common/Button";

import ArrowDown from "@/public/icon/aroow-down.svg";
import Link from "next/link";

export default function Navbar() {
  return (
    <section className="section navbar_section">
      <nav className="page_width navbar">
        <Link href="/">
          <Logo />
        </Link>

        <div className="nav_links">
          <ul>
            <li>
              Buyers <ArrowDown />
            </li>
            <li>
              Sellers <ArrowDown />
            </li>
            <li>
              Services <ArrowDown />
            </li>
          </ul>
        </div>

        <div className="nav_actions">
          <Link href="/login" className="btn btn-secondary">
            Sign In
          </Link>

          <Link href="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </nav>
    </section>
  );
}
