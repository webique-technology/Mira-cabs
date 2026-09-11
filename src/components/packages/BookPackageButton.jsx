"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/booking-store";

export function BookPackageButton({ pkg }) {
  const router = useRouter();
  const setSearch = useBookingStore((s) => s.setSearch);

  const handleBookPackage = () => {
    const today = new Date().toISOString().split("T")[0];

    const packageSearch = {
      tripType: "tour-package",
      pickup: "Not Selected",
      destination: pkg.title || pkg.destinations?.join(" → "),
      pickupDate: today,
      pickupTime: "09:00",
      passengers: 4,
      days: pkg.durationDays || 1,
      packageDetails: {
        id: pkg.id,
        title: pkg.title,
        slug: pkg.slug,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        startingPrice: pkg.startingPrice,
      },
    };

    setSearch(packageSearch);
    router.push("/search");
  };

  return (
    <Button onClick={handleBookPackage} size="lg" className="rounded-2xl gap-2">
      <Sparkles className="h-4 w-4" /> Book This Package
    </Button>
  );
}