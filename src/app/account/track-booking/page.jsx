import { Suspense } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { TrackBookingClient } from "@/app/account/track-booking/track-booking-client";

export const metadata = {
  title: "Track Your Booking",
  description:
    "Track the live status of your Mira Cabs booking using your Booking ID.",
  robots: { index: false, follow: true },
};

export default function TrackBookingPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        eyebrow="Track Booking"
        title="Track your ride"
        description="Enter your Booking ID to view the real-time status of your ride."
      />

      <div className="w-full">
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-2xl" />}>
          <TrackBookingClient />
        </Suspense>
      </div>
    </div>
  );
}