"use client";

import { ShieldCheck, Star, Users } from "lucide-react";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { PageContainer } from "@/components/layout/PageContainer";
import { siteConfig } from "@/config/site";
import DynamicSwiper from "@/components/common/SwiperSlider";

const bannerData = [
  {
    id: 1,
    image: "/images/banner.webp",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[600px] w-full bg-secondary-950 flex flex-col justify-center">
      {/* Background Slider - dynamic 100% height */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <DynamicSwiper
          items={bannerData}
          effect="fade"
          enableAutoplay={false}
          enablePagination={false}
          enableNavigation={false}
          autoplayDelay={5000}
          loop={true}
          wrapperClassName="h-full"
          renderItem={(slide) => (
            <div
              className="relative h-full min-h-[600px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/30" />
            </div>
          )}
        />
      </div>

      {/* Hero Content */}
      <PageContainer className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto flex max-w-5xl flex-col text-center py-4">
          <div className="flex items-center flex-col">
            {/* <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-200 backdrop-blur-md">
              Trusted across Maharashtra
            </span> */}

            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Book Your Journey. We&apos;ll Handle the Road.
            </h1>

            {/* <p className="mt-3 max-w-2xl text-balance text-sm text-white/80 sm:text-base">
              Reliable one-way, round-trip, local and airport cabs with
              transparent pricing and verified drivers across Maharashtra.
            </p> */}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/90 sm:text-sm">
            <span className="flex items-center gap-1.5 mb-3 inline-flex items-center rounded-full border border-slate/20 bg-black/10 px-3 py-1.5 text-[12px] font-bold text-white-700">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {siteConfig.stats.averageRating} Rated Service
            </span>
            <span className="flex items-center gap-1.5 mb-3 inline-flex items-center rounded-full border border-slate/20 bg-black/10 px-3 py-1.5 text-[12px] font-bold text-white-700">
              <Users className="h-4 w-4 text-primary-300" />
              {(siteConfig.stats.ridesCompleted / 1000).toFixed(0)}K+ Rides
              Completed
            </span>
            <span className="flex items-center gap-1.5 mb-3 inline-flex items-center rounded-full border border-slate/20 bg-black/10 px-3 py-1.5 text-[12px] font-bold text-white-700">
              <ShieldCheck className="h-4 w-4 text-primary-300" />
              {siteConfig.stats.verifiedDrivers.toLocaleString("en-IN")}+
              Verified Drivers
            </span>
          </div>

          {/* Booking Box */}
          <div className="mt-6 w-full max-w-5xl">
            <BookingWidget variant="hero" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
