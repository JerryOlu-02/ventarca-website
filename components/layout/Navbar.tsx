"use client";

import Logo from "@/public/logo.svg";
import Search from "@/public/icon/search-user.svg";
import Message from "@/public/icon/message.svg";
import Notification from "@/public/icon/notifications.svg";
import UserImg from "@/public/images/contact-bg.jpg";

import Image from "next/image";
// import Button from "../common/Button";

import ArrowDown from "@/public/icon/aroow-down.svg";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export default function Navbar() {
  const { user, logout } = useAuth();

  const logoutUser = async function () {
    await logout();
  };

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

        {!user && (
          <div className="nav_actions">
            <Link href="/login" className="btn btn-secondary">
              Sign In
            </Link>

            <Link href="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}

        {user && (
          <div className="nav_user">
            <div className="nav_user-item">
              <Search />
            </div>

            <div className="nav_user-item">
              <Message />
            </div>

            <div className="nav_user-item">
              <Notification />
            </div>

            <div className="nav_user-profile">
              <div className="nav_user-img">
                <Image src={UserImg} alt="User_image" />
              </div>

              <p>Charlie</p>

              <span onClick={logoutUser} className="user_options">
                <ArrowDown />
              </span>
            </div>
          </div>
        )}
      </nav>
    </section>
  );
}
