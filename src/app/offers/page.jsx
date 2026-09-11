import { SectionHeading } from "@/components/common/SectionHeading";
import { PageContainer } from "@/components/layout/PageContainer";
import { OfferCard } from "@/components/offers/OfferCard";
import { getOffers } from "@/services/booking-service";

export const metadata = {
  title: "Offers",
  description: "Apply active coupon deals and discounts on cab bookings.",
  alternates: { canonical: "/offers" },
};

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Offers"
        title="Save more on every ride"
        description="Copy a coupon code and apply it during checkout."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </PageContainer>
  );
}
