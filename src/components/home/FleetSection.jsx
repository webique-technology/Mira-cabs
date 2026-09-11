"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FleetCard } from "@/components/fleet/FleetCard";
import { Button } from "@/components/ui/button";
import { getVehicles } from "@/services/vehicle-service";
import DynamicSwiper from "../common/SwiperSlider";
import { FleetSectionFallback } from "@/components/home/HomeSectionFallbacks";

export function FleetSection() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getVehicles()
      .then((data) => {
        if (isMounted) {
          setVehicles(data || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <FleetSectionFallback />;
  }

  return (
    <section className="bg-primary/10 py-16 sm:py-24">
      <PageContainer>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Our Fleet"
            title="Choose Your Comfort for "
            highlightTitle={"Every Destination"}
          />
          <Button asChild variant="">
            <Link href="/fleet">Explore Fleet</Link>
          </Button>
        </div>
        <div className="mt-10">
          <DynamicSwiper
            items={vehicles}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            enableAutoplay={true}
            autoplayDelay={4000}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1260: { slidesPerView: 5, spaceBetween: 24 },
            }}
            renderItem={(vehicle) => (
              <FleetCard
                vehicle={vehicle}
                imgContClass="max-h-[147px]"
                isFeatures={false}
              />
            )}
          />
        </div>
      </PageContainer>
    </section>
  );
}
