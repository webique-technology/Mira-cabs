"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FleetTiltCard } from "@/components/fleet/FleetTiltCard";
import { formatCurrency } from "@/lib/utils";
import { useBookingStore } from "@/store/booking-store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/Pop-up-box";
import { BookingWidget } from "@/components/booking/BookingWidget";

export function FleetCard({
  vehicle,
  imgContClass = "max-h-1/2",
  isFeatures = true,
  isFeatures2 = false,
}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  // const selectVehicle = useBookingStore((s) => s.selectVehicle);
  // const setSearch = useBookingStore((s) => s.setSearch);

  const setFleetBooking = useBookingStore((s) => s.setFleetBooking);

  const handleFleetFormSubmit = (searchData) => {
    const cleanSearch = {
      ...searchData,
      passengers: Math.min(
        Number(searchData.passengers) || 1,
        vehicle.seats || 4,
      ),
    };

    // Atomically writes selectedVehicle & search to store without wiping selectedVehicle
    setFleetBooking(vehicle, cleanSearch);

    setOpenModal(false);
    router.push("/checkout");
  };
  return (
    <>
      <FleetTiltCard>
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft">
          <div
            className={`relative h-full w-full bg-muted flex items-center p-2 justify-center ${imgContClass}`}
          >
            <Image
              src={vehicle.image}
              alt={`${vehicle.category} — ${vehicle.name}`}
              width={400}
              height={250}
              className="object-cover w-auto h-auto"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2.5 p-5">
            <h3 className="text-base font-bold text-secondary-900">
              {vehicle.name}
            </h3>
            <p className="text-xs text-muted-foreground">{vehicle.bestFor}</p>
            {isFeatures === true && (
              <div className="flex flex-wrap gap-2 text-xs font-medium text-secondary-700">
                <span className="inline-flex items-center gap-1 rounded-lg bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-600 inset-ring inset-ring-yellow-400/20">
                  <Users className="h-3.5 w-3.5" /> {vehicle.seats} Seats
                </span>
                {vehicle.features.map((feature, i) => {
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-lg bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-600 inset-ring inset-ring-yellow-400/20"
                    >
                      {feature}
                    </span>
                  );
                })}
              </div>
            )}
            {isFeatures2 === true && (
              <div className="flex flex-wrap gap-2 text-xs font-medium text-secondary-700">
                <span className="inline-flex items-center bg-yellow-400/10 px-2 py-[2px] text-[10px] font-medium text-yellow-600 inset-ring inset-ring-yellow-400/20">
                  <Users className="h-3.5 w-3.5" /> {vehicle.seats} Seats
                </span>
                {vehicle.features.map((feature, i) => {
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center bg-yellow-400/10 px-2 py-[2px] text-[10px] font-medium text-yellow-600 inset-ring inset-ring-yellow-400/20"
                    >
                      {feature}
                    </span>
                  );
                })}
              </div>
            )}
            <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3">
              <div>
                <p className="text-[11px] text-muted-foreground">
                  Starting from
                </p>
                <p className="text-lg font-bold text-secondary-900">
                  {formatCurrency(vehicle.finalFare || vehicle.baseFare)}
                </p>
              </div>

              <Button
                size="sm"
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenModal(true);
                }}
                className="rounded-xl px-4 font-semibold"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </FleetTiltCard>

      {/* Booking Dialog Modal for Fleet */}
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent className="w-[95vw] max-w-5xl overflow-visible p-5 sm:p-7">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <AlertDialogHeader className="text-left space-y-1">
              <AlertDialogTitle className="text-lg sm:text-xl font-bold text-secondary-900">
                Book {vehicle.name}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-muted-foreground">
                Enter your trip details to confirm your booking for this{" "}
                {vehicle.category}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="mt-2 overflow-visible">
            <BookingWidget
              variant="modal"
              submitLabel="Proceed to Checkout"
              maxPassengers={vehicle.seats}
              onComplete={handleFleetFormSubmit}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
