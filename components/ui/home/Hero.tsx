"use client";

import Button from "@/components/common/Button";
import Image from "next/image";

// HERO IMAGES
import HeroSellImg from "@/public/images/hero-sell-bg.jpg";
import HeroBuyImg from "@/public/images/hero-buy-bg.jpg";
import { useState } from "react";
import Slider from "@/components/common/Slider";
import HeroSearch from "@/components/forms/HeroSearch";

// HERO SECTION
export default function Hero() {
  const [activeOption, setActiveOption] = useState<number>(0);

  const options = ["sell", "buy"];

  const sliders = [
    <HeroSell className="hero_option_container" />,
    <HeroBuy className="hero_option_container" />,
  ];

  const changeOption = (index: number) => {
    setActiveOption(index);
  };

  return (
    <section className="hero_section">
      <div className="hero_bg">
        <div className="hero_bg_overlay" />

        <Image
          className={`${activeOption === 0 && "active"}`}
          src={HeroSellImg}
          alt="Hero_sell_image"
        />
        <Image
          className={`${activeOption === 1 && "active"}`}
          src={HeroBuyImg}
          alt="Hero_buy_image"
        />
      </div>

      <div className="hero">
        <aside className="hero_options">
          {options.map((option, i) => (
            <span
              className={`${activeOption === i && "active"}`}
              onClick={() => changeOption(i)}
              key={i}
            >
              I am here to {option}
            </span>
          ))}
        </aside>

        <div className="hero_option_wrapper">
          <Slider
            slides={sliders}
            customSlide={activeOption}
            changeSlideIndex={changeOption}
          />
        </div>

        <aside className="hero_stats">
          <div>
            <h3>$100M+</h3>
            <p>Worth Businesses Sold</p>
          </div>

          <div>
            <h3>$2B+</h3>
            <p>Purchasable Profit</p>
          </div>

          <div>
            <h3>36K+</h3>
            <p>Qualified Buyers</p>
          </div>

          <div>
            <h3>Free</h3>
            <p>Business Valuation</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function HeroSell({ className }: { className: string }) {
  return (
    <div className={className}>
      <aside className="hero_text">
        <h2>Sell Your Business with Speed and Confidence</h2>

        <p>
          Turn the value you’ve built into the exit you deserve. Ventarca
          connects you with qualified buyers, provides real-time business <br />
          valuations, and guides you through every step — from listing to
          negotiation to sale.
        </p>
      </aside>

      <aside className="hero_buttons sell">
        <Button className="btn btn-secondary btn-small">
          Value Your Business
        </Button>

        <Button className="btn btn-primary btn-small">
          List Your Business
        </Button>
      </aside>
    </div>
  );
}

function HeroBuy({ className }: { className: string }) {
  return (
    <div className={className}>
      <aside className="hero_text">
        <h2>Find your next business opportunity</h2>
      </aside>

      <HeroSearch />

      <aside className="hero_buttons">
        <Button className="btn btn-secondary btn-medium">
          Recommended Listings
        </Button>

        <Button className="btn btn-secondary btn-medium">
          How to Buy a Business
        </Button>
      </aside>
    </div>
  );
}
