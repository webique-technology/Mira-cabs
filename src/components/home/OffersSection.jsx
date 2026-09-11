import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { OfferCard } from "@/components/offers/OfferCard";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { getOffers } from "@/services/booking-service";

export async function OffersSection() {
  const offers = await getOffers();

  return (
    <section className="py-16 sm:py-24">
      <PageContainer>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Offers"
            title="Current deals and coupon codes"
          />
          <Button asChild variant="outline">
            <Link href="/offers">View All Offers</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offers.slice(0, 3).map((offer, i) => (
            <Reveal key={offer.id} delay={i * 0.06}>
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
