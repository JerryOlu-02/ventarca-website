import { User } from "@/types/apiResponse";
import { useState } from "react";

import NavDropdown from "./NavDropdown";

import ArrowDown from "@/public/icon/aroow-down.svg";

import NoUserImage from "@/public/images/no-user-img.png";

import Link from "next/link";
import Image from "next/image";

export default function NavbarMobile({
  user,
  isMobileMenuVisible,
  logoutUser,
}: {
  user: User | null;
  isMobileMenuVisible: boolean;
  logoutUser: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function changeActiveIndex(index: number | null) {
    setActiveIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  }

  return (
    <div className={`nav_mobile ${isMobileMenuVisible && "visible"}`}>
      <div className="nav_links_mobile">
        <button
          type="submit"
          onClick={() => changeActiveIndex(0)}
          className={`nav_item_mobile ${activeIndex === 0 && "active"}`}
        >
          <span className="links_dropdown_mobile">
            Buyers <ArrowDown />
          </span>

          {user ? (
            <NavDropdown
              className={`nav_dropdown_mobile ${activeIndex === 0 && "active"}`}
              items={["Search", "Recently Viewed", "My Bookmarks"]}
            />
          ) : (
            <NavDropdown
              className={`nav_dropdown_mobile ${activeIndex === 0 && "active"}`}
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
          type="submit"
          onClick={() => changeActiveIndex(1)}
          className={`nav_item_mobile ${activeIndex === 1 && "active"}`}
        >
          <span className="links_dropdown_mobile">
            Sellers <ArrowDown />
          </span>

          {user ? (
            <NavDropdown
              className={`nav_dropdown_mobile ${activeIndex === 1 && "active"}`}
              items={[
                "List Business",
                "View and Edit Listings",
                "My Analytics",
                "Valuation Tool",
              ]}
            />
          ) : (
            <NavDropdown
              className={`nav_dropdown_mobile ${activeIndex === 1 && "active"}`}
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
          onClick={() => changeActiveIndex(2)}
          className={`nav_item_mobile ${activeIndex === 2 && "active"}`}
        >
          <span className="links_dropdown_mobile">
            Services <ArrowDown />
          </span>

          {user ? (
            <NavDropdown
              className={`nav_dropdown_mobile ${activeIndex === 2 && "active"}`}
              items={[
                "Find a Broker",
                "Find an Accountant",
                "Find a Solicitor",
              ]}
            />
          ) : (
            <NavDropdown
              className={`nav_dropdown_mobile ${activeIndex === 2 && "active"}`}
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
        <div className="nav_actions_mobile">
          <Link href="/login" className="btn btn-secondary">
            Sign In
          </Link>

          <Link href="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      )}

      {user && (
        <div className="nav_user_mobile">
          <div className="nav_user-profile_mobile">
            <aside>
              <div className="nav_user-img_mobile">
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
            </aside>

            <button
              type="button"
              onClick={() => changeActiveIndex(4)}
              className="user_options"
            >
              <ArrowDown />
            </button>
          </div>

          <div
            className={`nav_dropdown_user_mobile ${
              activeIndex === 4 && "active"
            }`}
          >
            <div className="dropdown_item">Dashboard</div>
            <div className="dropdown_item">Account Hub</div>
            <div className="dropdown_item" onClick={logoutUser}>
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
