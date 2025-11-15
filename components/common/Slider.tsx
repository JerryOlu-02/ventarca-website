"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { SwiperOptions } from "swiper/types";

import "@/styles/components/common/slider.scss";

interface SwiperCarouselProps {
  slides: (string | React.ReactNode)[];
  spaceBetween?: number | string;
  autoplay?: boolean;
  slidesPerView?: number;
  showPagination?: boolean;
  showProgressBar?: boolean;
  className?: string;
  wrapperStyle?: CSSProperties;
  slideStyle?: CSSProperties;
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  vertical?: boolean;
  customSlide?: number; //Active Index in parent component
  changeSlideIndex?: (index: number) => void; //function that changes active Index in parent component
}

export default function Slider({
  slides,
  autoplay,
  slidesPerView,
  showPagination,
  spaceBetween,
  className,
  wrapperStyle,
  slideStyle,
  breakpoints,
  showProgressBar,
  vertical,
  customSlide,
  changeSlideIndex,
}: SwiperCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Slide To Cliked Navigation Index in Parent component
  useEffect(() => {
    if (typeof customSlide === "number") {
      swiperRef.current?.slideToLoop(customSlide);
    }
  }, [customSlide]);

  //Change Active index anytime a slide changes
  const handleSlideChange = (index: number) => {
    if (typeof changeSlideIndex === "function") changeSlideIndex(index);

    setActiveIndex(index);
  };

  return (
    <div className="slider_container">
      <Swiper
        direction={vertical ? "vertical" : "horizontal"}
        pagination={
          showProgressBar && {
            type: "progressbar",
          }
        }
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        slidesPerView={slidesPerView}
        autoplay={autoplay ? { delay: 3000 } : false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
        className={`mySwiper ${className}`}
        style={wrapperStyle}
      >
        {slides.map((slide, i) => (
          <SwiperSlide style={slideStyle} key={i}>
            {typeof slide === "string" ? (
              <img src={slide} alt={`Slide ${i + 1}`} className="" />
            ) : (
              slide
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      {showPagination && (
        <div className="">
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={` ${activeIndex === i && "active"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Custom Progressbar */}
    </div>
  );
}
