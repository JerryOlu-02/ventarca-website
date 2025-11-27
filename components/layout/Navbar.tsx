"use client";

import Logo from "@/public/logo.svg";
import LogoMobile from "@/public/icon/logo-mobile.svg";

import Search from "@/public/icon/search-user.svg";
import Message from "@/public/icon/message.svg";
import Notification from "@/public/icon/notifications.svg";
import NoUserImage from "@/public/images/no-user-img.png";

import Image from "next/image";
// import Button from "../common/Button";

import ArrowDown from "@/public/icon/aroow-down.svg";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import NavDropdown from "./NavDropdown";
import { useState } from "react";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [isUserDropdownVisible, setIsUserDropdownVisible] =
    useState<boolean>(false);

  function changeActiveIndex(index: number | null) {
    setActiveIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  }

  function toggleIsUserDropdownVisible() {
    setIsUserDropdownVisible((prev) => (prev ? false : !prev));
  }

  function toggleIsMobileMenuVisible() {
    setIsMobileMenuVisible((prev) => (prev ? false : !prev));
  }

  const logoutUser = async function () {
    await logout();
  };

  return (
    <section className="section navbar_section">
      <nav className="page_width navbar">
        <Link className="logo" href="/">
          <Logo />

          <LogoMobile />
        </Link>

        <div className={`nav_links`}>
          <button
            type="button"
            onMouseEnter={() => changeActiveIndex(0)}
            onMouseLeave={() => changeActiveIndex(null)}
            className={`nav_item ${activeIndex === 0 && "active"}`}
          >
            <span className="links_dropdown">
              Buyers <ArrowDown />
            </span>

            {user ? (
              <NavDropdown
                className={`nav_dropdown ${activeIndex === 0 && "active"}`}
                items={["Search", "Recently Viewed", "My Bookmarks"]}
              />
            ) : (
              <NavDropdown
                className={`nav_dropdown ${activeIndex === 0 && "active"}`}
                items={[
                  "Search for a Business",
                  "New Businesses",
                  "Online Businesses",
                  "Commercial Properties",
                  "Register as a Buyer",
                  "Login",
                ]}
              />
            )}
          </button>

          <button
            type="button"
            onMouseEnter={() => changeActiveIndex(1)}
            onMouseLeave={() => changeActiveIndex(null)}
            className={`nav_item ${activeIndex === 1 && "active"}`}
          >
            <span className="links_dropdown">
              Sellers <ArrowDown />
            </span>

            {user ? (
              <NavDropdown
                className={`nav_dropdown ${activeIndex === 1 && "active"}`}
                items={[
                  "List Business",
                  "View and Edit Listings",
                  "My Analytics",
                  "Valuation Tool",
                ]}
              />
            ) : (
              <NavDropdown
                className={`nav_dropdown ${activeIndex === 1 && "active"}`}
                items={[
                  "Sell your Business",
                  "Value a  Business",
                  "Sell with a Broker",
                  "Register as a Seller",
                  "Login",
                ]}
              />
            )}
          </button>

          <button
            type="button"
            onMouseEnter={() => changeActiveIndex(2)}
            onMouseLeave={() => changeActiveIndex(null)}
            className={`nav_item ${activeIndex === 2 && "active"}`}
          >
            <span className="links_dropdown">
              Services <ArrowDown />
            </span>

            {user ? (
              <NavDropdown
                className={`nav_dropdown ${activeIndex === 2 && "active"}`}
                items={[
                  "Find a Broker",
                  "Find an Accountant",
                  "Find a Solicitor",
                ]}
              />
            ) : (
              <NavDropdown
                className={`nav_dropdown ${activeIndex === 2 && "active"}`}
                items={[
                  "Sell with a Broker",
                  "Hire a Solicitor",
                  "Hire an Accountant",
                  "Register as a Service Provider",
                  "Login as a Service Provider ",
                ]}
              />
            )}
          </button>
        </div>

        {!user && (
          <div className={`nav_actions`}>
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
                {user.photo && user.photo.path ? (
                  <Image
                    src={user.photo.path}
                    alt="User_image"
                    unoptimized
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image src={NoUserImage} alt="User_image" />
                )}
              </div>

              <p>{user.firstName}</p>

              <button
                type="button"
                onClick={toggleIsUserDropdownVisible}
                className="user_options"
              >
                <ArrowDown />
              </button>

              <div
                className={`nav_dropdown_user ${
                  isUserDropdownVisible && "active"
                }`}
              >
                <div className="dropdown_item">Dashboard</div>
                <div className="dropdown_item">Account Hub</div>
                <div className="dropdown_item" onClick={logoutUser}>
                  Logout
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          onClick={toggleIsMobileMenuVisible}
          className={`nav_menu ${isMobileMenuVisible && "visible"}`}
        >
          <span />
          <span />
          <span />
        </div>

        <NavbarMobile
          user={user}
          logoutUser={logoutUser}
          isMobileMenuVisible={isMobileMenuVisible}
        />
      </nav>
    </section>
  );
}
