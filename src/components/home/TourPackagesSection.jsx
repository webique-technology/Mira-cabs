"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PackageCard } from "@/components/packages/PackageCard";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { getPackages } from "@/services/package-service";
import DynamicSwiper from "@/components/common/SwiperSlider";
import { TourPackagesSectionFallback } from "@/components/home/HomeSectionFallbacks";

function PackageSlider({ packages = [] }) {
  return (
    <DynamicSwiper
      items={packages}
      slidesPerView={1}
      spaceBetween={24}
      loop={true}
      enableAutoplay={true}
      enablePagination={false}
      enableNavigation={false}
      autoplayDelay={5000}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      }}
      renderItem={(pkg, i) => (
        <Reveal delay={i * 0.06} className="h-full">
          <PackageCard pkg={pkg} />
        </Reveal>
      )}
    />
  );
}

export function TourPackagesSection() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getPackages()
      .then((data) => {
        if (isMounted) {
          setPackages(data || []);
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
    return <TourPackagesSectionFallback />;
  }

  return (
    <section className="py-16 sm:py-24">
      <PageContainer>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Tour Packages"
            title="Plan Your Perfect "
            highlightTitle={"Extended Getaway"}
          />
          <Button asChild variant="default">
            <Link href="/packages">View All Packages</Link>
          </Button>
        </div>
        <div className="mt-10">
          <PackageSlider packages={packages} />
        </div>
      </PageContainer>
    </section>
  );
}