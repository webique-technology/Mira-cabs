import { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { BookingSuccessClient } from "@/app/booking-success/booking-success-client";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Booking Confirmed",
  description: "Your Mira Cabs booking has been confirmed.",
  robots: { index: false, follow: false },
};

export default function BookingSuccessPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <Suspense fallback={<Skeleton className="mx-auto h-96 max-w-2xl" />}>
        <BookingSuccessClient />
      </Suspense>
    </PageContainer>
  );
}
