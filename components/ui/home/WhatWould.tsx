"use client";

import Image from "next/image";
import Button from "@/components/common/Button";
import Slider from "@/components/common/Slider";

import ArrowLeft from "@/public/icon/arrow-left.svg";
import ArrowRight from "@/public/icon/arrow-right.svg";

import WhatWould2Svg from "@/public/images/what-would-2.svg";
import WhatWould3Svg from "@/public/images/what-would-3.svg";

import { Broker } from "@/types";

import { useState } from "react";

// WHAT WOULD SECTION
export default function WhatWould({
  brokers,
  onScrollClick,
}: {
  brokers: Broker[];
  onScrollClick: () => void;
}) {
  // Active Broker State For Broker Slider Items
  const [activeBroker, setActiveBroker] = useState<number>(0);

  const sliders: React.ReactNode[] = new Array();
  brokers.map((broker) =>
    sliders.push(<BrokersItem key={broker.id} broker={broker} />)
  );

  const changeActiveBroker = function (i: number) {
    setActiveBroker(i);
  };

  const goToPrevSlide = () => {
    if (activeBroker === 0) return;
    setActiveBroker((prevIndex) => prevIndex - 1);
  };

  const goToNextSlide = () => {
    if (activeBroker === brokers.length - 1) return;
    setActiveBroker((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="page_width whatWould">
      <h2>What would you like to do?</h2>

      <aside className="whatWould_container container_homepage">
        <div className="whatWould_item">
          <div className="whatWould_item_text">
            <h5>Meet Our Brokers</h5>
            <p>Euismod vestibulum enim nisi lectu.</p>
          </div>

          {/* <MySliderWhatWould slides={brokers} /> */}

          <div>
            <Slider
              slides={sliders}
              customSlide={activeBroker}
              changeSlideIndex={changeActiveBroker}
            />
          </div>

          <div className="whatWouldSwiper_controls">
            <div onClick={goToPrevSlide}>
              <ArrowLeft />
            </div>

            <aside>
              {brokers.map((_, i) => (
                <span
                  className={`${activeBroker === i && "active"}`}
                  key={i}
                  onClick={() => changeActiveBroker(i)}
                ></span>
              ))}
            </aside>

            <div onClick={goToNextSlide}>
              <ArrowRight />
            </div>
          </div>

          <Button className="btn btn-secondary btn-small">
            View All Brokers
          </Button>
        </div>

        <div className="whatWould_item">
          <div className="whatWould_item_text">
            <h5>Learn About Trends</h5>
            <p>
              Condimentum vivamus nibh erat odio ultrices consectetur ornare
              maecenas.
            </p>
          </div>

          <div className="whatWould_item_image">
            <span className="whatWouldSvg">
              <WhatWould2Svg />
            </span>

            <div>
              <p>The Ventarca Newsletter</p>
              <p>Buying the Next Bloomberg</p>
              <span>Hello Curtis, have you ever wondered how you’ll</span>
            </div>
          </div>

          <Button
            onClick={onScrollClick}
            className="btn btn-secondary btn-small"
          >
            Subscribe to Newsletter
          </Button>
        </div>

        <div className="whatWould_item">
          <div className="whatWould_item_text">
            <h5>Value Your Business</h5>
            <p>
              Amet tellus ultricies consectetur id. Et pharetra blandit cras in
              odio adipiscing.
            </p>
          </div>

          <div className="whatWould_item_image">
            <span className="whatWouldSvg">
              <WhatWould3Svg />
            </span>

            <div>
              <p>Did you Know?</p>
              <span>
                Elementum at nunc sed vel at. Sagittis duis nisl maecenas massa
                malesuada.
              </span>
            </div>
          </div>

          <Button className="btn btn-secondary btn-small">
            Get A Free Valuation
          </Button>
        </div>
      </aside>
    </div>
  );
}

function BrokersItem({ broker }: { broker: Broker }) {
  return (
    <div className="whatWould_item_image">
      <Image src={broker.image} alt="What_Would-Image" />
      <div>
        <p>{broker.name}</p>
        <p>{broker.role}</p>
        <span>{broker.location}</span>
      </div>
    </div>
  );
}
