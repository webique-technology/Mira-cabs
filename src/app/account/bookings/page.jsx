"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Car, MapPin, Clock, ArrowRight, XCircle, Compass } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/Pop-up-box";
import { EmptyState } from "@/components/common/EmptyState";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";

// Category Formatter Helper
const formatCategory = (tripType) => {
  switch (tripType?.toLowerCase()) {
    case "tour-package":
    case "package":
      return "Tour Package";
    case "round-trip":
    case "roundtrip":
      return "Round Trip";
    case "one-way":
    case "oneway":
      return "One Way";
    case "local":
    case "rental":
      return "Local Rental";
    case "airport":
      return "Airport Transfer";
    case "shared":
    case "shared-ride":
      return "Shared Ride";
    default:
      return "Outstation";
  }
};

const INITIAL_DEMO_BOOKINGS = [
  {
    id: "MIRA-89342",
    tripType: "one-way",
    date: "28 Aug 2026",
    time: "09:00 AM",
    pickup: "Nashik City",
    drop: "Mumbai Airport (BOM)",
    vehicle: "Sedan (Dzire / Etios)",
    status: "Confirmed",
    amount: "₹2,450",
  },
  {
    id: "MIRA-PKG702",
    tripType: "tour-package",
    date: "05 Sep 2026",
    time: "06:00 AM",
    pickup: "Mumbai",
    drop: "Trimbakeshwar → Shirdi → Grishneshwar",
    vehicle: "SUV (Innova Crysta)",
    status: "Confirmed",
    amount: "₹18,999",
  },
];

export default function AccountBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("mira_user_bookings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          const normalized = parsed.map((item) => ({
            id: item.id,
            tripType: item.search?.tripType || item.tripType || "one-way",
            date: item.search ? formatDate(item.search.pickupDate) : item.date,
            time: item.search ? formatTime(item.search.pickupTime) : item.time,
            pickup: item.search ? item.search.pickup : item.pickup,
            drop: item.search
              ? item.search.destination || "Local Rental"
              : item.drop,
            vehicle: item.vehicle
              ? typeof item.vehicle === "string"
                ? item.vehicle
                : `${item.vehicle.name} (${item.vehicle.category})`
              : "Standard Cab",
            status: item.status || "Confirmed",
            amount: item.fare
              ? formatCurrency(item.fare.total)
              : item.amount || "₹0",
          }));
          setBookings(normalized);
          return;
        }
      } catch (e) {
        // Fall back to demo list
      }
    }
    setBookings(INITIAL_DEMO_BOOKINGS);
  }, []);

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((item) =>
      item.id === bookingId ? { ...item, status: "Cancelled" } : item,
    );
    setBookings(updatedBookings);

    const stored = localStorage.getItem("mira_user_bookings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const newStored = parsed.map((item) =>
          item.id === bookingId ? { ...item, status: "cancelled" } : item,
        );
        localStorage.setItem("mira_user_bookings", JSON.stringify(newStored));
      } catch (e) {
        // ignore JSON error
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeading
          eyebrow="History"
          title="My Bookings"
          description="View and track your past and upcoming journeys."
        />
        <Button asChild className="self-start rounded-xl sm:self-auto">
          <Link href="/book">Book New Ride</Link>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <Card className="rounded-2xl border border-border p-8 shadow-soft">
          <EmptyState
            title="No Bookings Found"
            description="You haven't made any bookings yet. Start your journey today!"
            action={
              <Button asChild className="rounded-xl">
                <Link href="/book">Book a Ride</Link>
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bookings.map((booking) => {
            const isCancelled = booking.status.toLowerCase() === "cancelled";
            const isPackage =
              booking.tripType === "tour-package" ||
              booking.tripType === "package";

            return (
              <Card
                key={booking.id}
                className="flex flex-col justify-between rounded-2xl border border-border p-5 shadow-soft transition-all hover:shadow-md"
              >
                <div>
                  {/* Top Bar: Booking ID, Category Badge, Cancel Button & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between border-b border-border pb-3 gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Booking ID
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {booking.id}
                      </span>
                      {/* Trip Category Tag */}
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={isPackage ? "default" : "outline"}
                          className={`rounded-md text-[10px] font-bold uppercase tracking-wide ${
                            isPackage
                              ? "bg-amber-500 text-white border-transparent"
                              : "text-slate-600 bg-slate-50"
                          }`}
                        >
                          {/* <Compass className="mr-1 h-3 w-3" /> */}
                          {formatCategory(booking.tripType)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isCancelled && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive-outline"
                              size="sm"
                              className="h-7 rounded-full px-2.5 text-xs font-semibold"
                            >
                              <XCircle className="mr-1 h-3.5 w-3.5" /> Cancel
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="max-w-md p-6">
                            <div className="flex flex-col gap-2">
                              <AlertDialogTitle className="text-base font-bold text-slate-900">
                                Cancel Booking?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-xs leading-relaxed text-slate-500">
                                Are you sure you want to cancel booking{" "}
                                <strong className="text-slate-700">
                                  {booking.id}
                                </strong>
                                ? This action cannot be undone.
                              </AlertDialogDescription>
                            </div>

                            <div className="mt-5 flex justify-end gap-2">
                              <AlertDialogCancel asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl"
                                >
                                  Keep Booking
                                </Button>
                              </AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="rounded-xl"
                                  onClick={() =>
                                    handleCancelBooking(booking.id)
                                  }
                                >
                                  Yes, Cancel
                                </Button>
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}

                      <Badge
                        variant={
                          isCancelled
                            ? "destructive"
                            : booking.status === "Confirmed" ||
                                booking.status === "confirmed"
                              ? "default"
                              : "secondary"
                        }
                        className="rounded-md text-xs font-semibold capitalize"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Route Information */}
                  <div className="flex flex-col gap-2.5 pt-4 text-sm">
                    <div className="flex items-start gap-2.5 text-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="leading-snug">
                        <span className="block text-xs text-muted-foreground">
                          Pickup Location
                        </span>
                        <span className="font-semibold">{booking.pickup}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <div className="leading-snug">
                        <span className="block text-xs text-muted-foreground">
                          {isPackage
                            ? "Tour Itinerary / Drop"
                            : "Drop Destination"}
                        </span>
                        <span className="font-semibold">{booking.drop}</span>
                      </div>
                    </div>
                  </div>

                  {/* Time & Vehicle details */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {booking.date}, {booking.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Car className="h-3.5 w-3.5" />
                      <span>{booking.vehicle}</span>
                    </div>
                  </div>
                </div>

                {/* Footer with Fare and Tracking Link */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <span className="block text-[11px] text-muted-foreground">
                      Fare
                    </span>
                    <span className="text-base font-bold text-foreground">
                      {booking.amount}
                    </span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs"
                  >
                    <Link
                      href={`/account/track-booking?bookingId=${booking.id}`}
                    >
                      Track Ride <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
