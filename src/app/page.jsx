import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { PopularRoutesSection } from "@/components/home/PopularRoutesSection";
import { TourPackagesSection } from "@/components/home/TourPackagesSection";
import { FleetSection } from "@/components/home/FleetSection";
import { OffersSection } from "@/components/home/OffersSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQPreview } from "@/components/home/FAQPreview";
import {
  FAQSectionFallback,
  FleetSectionFallback,
  OffersSectionFallback,
  RoutesSectionFallback,
  TestimonialsSectionFallback,
  TourPackagesSectionFallback,
} from "@/components/home/HomeSectionFallbacks";
import { CTABand } from "@/components/home/CTABand";
import { StickyMobileCTA } from "@/components/common/StickyMobileCTA";
import { getReviews } from "@/services/review-service";
import { getFaqs } from "@/services/faq-service";
import { siteConfig } from "@/config/site";
import { CarCategoryRow } from "@/components/home/CarMarquee";

export const metadata = {
  title: "Reliable One-Way, Round-Trip & Airport Cabs Across Maharashtra",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export const revalidate = 300;

async function TestimonialsSection() {
  const reviews = await getReviews();
  return <Testimonials reviews={reviews.slice(0, 6)} />;
}

async function FAQSection() {
  const faqs = await getFaqs();
  return <FAQPreview faqs={faqs.slice(0, 6)} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <CarCategoryRow />
      
      <HowItWorks />

      <Suspense fallback={<TourPackagesSectionFallback />}>
        <TourPackagesSection />
      </Suspense>

      <Suspense fallback={<FleetSectionFallback />}>
        <FleetSection />
      </Suspense>

      {/* <Suspense fallback={<OffersSectionFallback />}>
        <OffersSection />
      </Suspense> */}

      <WhyChooseUs />

      <Suspense fallback={<RoutesSectionFallback />}>
        <PopularRoutesSection />
      </Suspense>

      <Suspense fallback={<TestimonialsSectionFallback />}>
        <TestimonialsSection />
      </Suspense>

      {/* <Suspense fallback={<FAQSectionFallback />}>
        <FAQSection />
      </Suspense> */}

      <CTABand />
      {/* <StickyMobileCTA /> */}
    </>
  );
}
