"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  Home,
  ListChecks,
  MapPin,
  User,
  MoveRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookingById } from "@/services/booking-service";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";

function downloadReceipt(booking) {
  const lines = [
    `Mira Cabs — Booking Receipt`,
    `Booking ID: ${booking.id}`,
    `Status: ${booking.status}`,
    `Trip Type: ${booking.search.tripType}`,
    `Pickup: ${booking.search.pickup}`,
    booking.search.destination
      ? `Destination: ${booking.search.destination}`
      : "",
    `Date: ${formatDate(booking.search.pickupDate)}`,
    `Time: ${formatTime(booking.search.pickupTime)}`,
    `Vehicle: ${booking.vehicle.name} (${booking.vehicle.category})`,
    `Passenger: ${booking.passenger.fullName} — ${booking.passenger.mobile}`,
    `Payment Method: ${booking.paymentMethod}`,
    `Total Fare: ${formatCurrency(booking.fare.total)} (estimate)`,
  ].filter(Boolean);

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${booking.id}-receipt.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function BookingSuccessClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState(undefined);

  useEffect(() => {
    if (!bookingId) {
      setBooking(null);
      return;
    }
    getBookingById(bookingId).then((result) => setBooking(result ?? null));
  }, [bookingId]);

  if (booking === undefined) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!booking) {
    return (
      <EmptyState
        title="Booking not found"
        description="We couldn't find this booking. It may have expired from local demo storage."
        action={
          <Button asChild>
            <Link href="/book">Book a New Cab</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-11 w-11" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-secondary-900 sm:text-3xl">
          Booking Confirmed!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your booking ID is{" "}
          <span className="font-bold text-secondary-900">{booking.id}</span>. A
          confirmation has been sent to {booking.passenger.email}.
        </p>
      </motion.div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="success">
            Payment{" "}
            {booking.paymentMethod === "cash"
              ? "Pending (Pay Driver)"
              : "Confirmed"}
          </Badge>
          <Badge variant="secondary">Driver Assignment In Progress</Badge>
        </div>

        {/* Route Details with Responsive Right/Down Arrow Indicator */}
        <div className="relative mt-4 flex flex-col items-stretch gap-3 rounded-xl sm:flex-row sm:items-center">
          {/* Pickup Column */}
          <div className="flex h-full flex-1 items-start gap-2.5 rounded-lg border border-border/50 bg-background/80 p-2.5 shadow-xs">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
            <div className="flex min-w-0 flex-col leading-snug">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Pickup
              </span>
              <span className="break-words text-sm font-bold text-secondary-900 sm:text-base">
                {booking.search.pickup}
              </span>
            </div>
          </div>

          {/* Centered Arrow Indicator (Right on desktop, Down on mobile) */}
          <div className="flex shrink-0 items-center justify-center self-center rounded-full border border-border/70 bg-background p-2 text-muted-foreground shadow-xs">
            <ArrowRight className="hidden h-4 w-4 sm:block text-primary-600" />
            <ArrowDown className="block h-4 w-4 sm:hidden text-primary-600" />
          </div>

          {/* Drop / Destination Column */}
          <div className="flex h-auto flex-1 items-start gap-2.5 rounded-lg border border-border/50 bg-background/80 p-2.5 shadow-xs">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary-600" />
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Drop / Destination
              </span>
              <span className="break-words text-sm font-bold text-secondary-900 sm:text-base">
                {booking.search.destination || "Local Rental / Sightseeing"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />{" "}
            {formatDate(booking.search.pickupDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />{" "}
            {formatTime(booking.search.pickupTime)}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {booking.passenger.fullName}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">
            {booking.vehicle.name} · {booking.vehicle.category}
          </span>
          <span className="text-xl font-extrabold text-secondary-900">
            {formatCurrency(booking.fare.total)}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button variant="outline" onClick={() => downloadReceipt(booking)}>
          <Download className="mr-1.5 h-4 w-4" /> Download Receipt
        </Button>
        <Button asChild variant="outline">
          <Link href={`/account/track-booking?bookingId=${booking.id}`}>
            Track Booking
          </Link>
        </Button>
        <Button asChild>
          <Link href="/account/bookings">
            <ListChecks className="mr-1.5 h-4 w-4" /> Go to My Bookings
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">
            <Home className="mr-1.5 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
