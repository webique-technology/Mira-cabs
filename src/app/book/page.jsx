import { PageContainer } from "@/components/layout/PageContainer";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata = {
  title: "Book a Cab",
  description:
    "Book a one-way, round-trip, local, airport or shared cab in minutes with transparent, upfront pricing.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Book a Cab"
        title="Where would you like to go?"
        description="Fill in your journey details to see available cabs and fares instantly."
      />
      <div className="mt-8">
        <BookingWidget variant="page" />
      </div>
    </PageContainer>
  );
}
