"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin, Pencil, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/Pop-up-box";
import { BookingWidget } from "@/components/booking/bookingWidget";
import { useBookingStore } from "@/store/booking-store";

const TRIP_LABELS = {
  "one-way": "One-Way Trip",
  "round-trip": "Round Trip",
  "tour-package": "Tour Package",
  package: "Tour Package",
  local: "Local Rental",
  airport: "Airport Transfer",
  shared: "Shared Ride",
};

export function BookingSummary({ search, showModify = true }) {
  const [openModal, setOpenModal] = useState(false);
  const selectedVehicle = useBookingStore((s) => s.selectedVehicle);
  const setFleetBooking = useBookingStore((s) => s.setFleetBooking);
  const setSearch = useBookingStore((s) => s.setSearch);

  const isTourPackage =
    search?.tripType === "tour-package" || search?.tripType === "package";

  const shouldShowTopBar =
    !isTourPackage && (TRIP_LABELS[search?.tripType] || showModify);

  const handleModifyComplete = (newSearchData) => {
    // If a vehicle is already active, preserve it atomically without resetting it to null
    if (selectedVehicle) {
      setFleetBooking(selectedVehicle, {
        ...search,
        ...newSearchData,
      });
    } else {
      setSearch({
        ...search,
        ...newSearchData,
      });
    }
    setOpenModal(false);
  };

  if (!search) return null;

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        {shouldShowTopBar && (
          <div className="flex items-start justify-between gap-3">
            {TRIP_LABELS[search.tripType] ? (
              <Badge variant="secondary">{TRIP_LABELS[search.tripType]}</Badge>
            ) : (
              <div />
            )}

            {showModify && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpenModal(true)}
                className="rounded-xl"
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" /> Modify Search
              </Button>
            )}
          </div>
        )}

        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-bold text-secondary-900 ${
            shouldShowTopBar ? "mt-4" : ""
          }`}
        >
          <MapPin className="h-4 w-4 text-primary-600" />
          <span>{search.pickup}</span>
          {search.destination ? (
            <>
              <span className="text-muted-foreground">→</span>
              <span>{search.destination}</span>
            </>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> {formatDate(search.pickupDate)}
            {search.returnDate ? ` – ${formatDate(search.returnDate)}` : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {formatTime(search.pickupTime)}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" /> {search.passengers} Passenger
            {search.passengers > 1 ? "s" : ""}
          </span>
          {search.rentalPackage ? (
            <Badge variant="muted">{search.rentalPackage}</Badge>
          ) : null}
          {search.flightNumber ? (
            <Badge variant="muted">Flight {search.flightNumber}</Badge>
          ) : null}
        </div>
      </div>

      {/* Modify Search Modal */}
      {/* Modify Search Modal */}
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent className="w-[95vw] max-w-5xl overflow-visible p-5 sm:p-7">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <AlertDialogHeader className="text-left space-y-1">
              <AlertDialogTitle className="text-lg sm:text-xl font-bold text-secondary-900">
                Modify Trip Details
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-muted-foreground">
                Update your trip type, route, pickup time, or passenger count.
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
              submitLabel="Update Trip"
              maxPassengers={selectedVehicle?.seats}
              initialData={search}
              onComplete={handleModifyComplete}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
