// components/DynamicSwiper.jsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCoverflow,
  EffectCards,
  A11y,
} from "swiper/modules";

// Core and module styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";

export default function DynamicSwiper({
  items = [],
  renderItem,
  wrapperClassName = "",
  slideClassName = "",
  slidesPerView = 1,
  spaceBetween = 20,
  loop = false,
  speed = 600,
  effect = "slide",
  enableAutoplay = false,
  autoplayDelay = 3500,
  enablePagination = true,
  enableNavigation = true,
  clickablePagination = true,
  dynamicBullets = true,
  breakpoints = null,
  modules = [],
  ...restProps
}) {
  // Dynamically attach only required modules
  const activeModules = [A11y, ...modules];

  if (enableNavigation) activeModules.push(Navigation);
  if (enablePagination) activeModules.push(Pagination);
  if (enableAutoplay) activeModules.push(Autoplay);
  if (effect === "fade") activeModules.push(EffectFade);
  if (effect === "coverflow") activeModules.push(EffectCoverflow);
  if (effect === "cards") activeModules.push(EffectCards);

  return (
    <div
      className={`dynamic-swiper-container relative w-full ${wrapperClassName}`}
    >
      <Swiper
        className="h-full"
        modules={activeModules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        speed={speed}
        effect={effect}
        navigation={enableNavigation}
        pagination={
          enablePagination
            ? {
                clickable: clickablePagination,
                dynamicBullets: dynamicBullets,
              }
            : false
        }
        autoplay={
          enableAutoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        breakpoints={breakpoints}
        {...restProps}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={item?.id || index}
            className={`${slideClassName}`}
            style={{ height: "auto !important" }}
          >
            {renderItem ? renderItem(item, index) : null}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
