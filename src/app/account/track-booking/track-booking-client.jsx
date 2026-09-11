"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Circle, Search, Car, Clock, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/common/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookingById } from "@/services/booking-service";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STAGES = [
  { key: "confirmed", label: "Booking Confirmed" },
  { key: "driver-assigned", label: "Driver Assigned" },
  { key: "ongoing", label: "Trip Ongoing" },
  { key: "completed", label: "Trip Completed" },
];

export function TrackBookingClient() {
  const searchParams = useSearchParams();
  const [bookingId, setBookingId] = useState(
    searchParams.get("bookingId") ?? searchParams.get("id") ?? "",
  );
  const [booking, setBooking] = useState(undefined);
  const [searched, setSearched] = useState(false);

  const runSearch = async (id) => {
    if (!id.trim()) return;
    setSearched(true);
    setBooking(undefined);
    const result = await getBookingById(id.trim());
    setBooking(result ?? null);
  };

  useEffect(() => {
    const initial = searchParams.get("bookingId") ?? searchParams.get("id");
    if (initial) runSearch(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStageIndex =
    booking && booking.status !== "cancelled"
      ? STAGES.findIndex((s) => s.key === booking.status)
      : -1;

  return (
    <div className="flex w-full flex-col gap-6">
      <Card className="rounded-2xl border border-border p-4 shadow-soft sm:p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(bookingId);
          }}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <Input
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            placeholder="Enter your Booking ID (e.g. RN-DEMO001)"
            aria-label="Booking ID"
            className="h-11 rounded-xl bg-background"
          />
          <Button type="submit" className="h-11 rounded-xl">
            <Search className="mr-1.5 h-4 w-4" /> Track
          </Button>
        </form>
      </Card>

      {!searched ? null : booking === undefined ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : booking === null ? (
        <Card className="rounded-2xl border border-border p-6 shadow-soft">
          <EmptyState
            title="Booking not found"
            description="Double-check your Booking ID and try again."
          />
        </Card>
      ) : (
        <Card className="rounded-2xl border border-border p-6 shadow-soft">
          <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold text-muted-foreground">Booking ID</span>
              <p className="text-base font-bold text-foreground">{booking.id}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>
                {formatDate(booking.search.pickupDate)} · {formatTime(booking.search.pickupTime)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium">
              {booking.search.pickup} {booking.search.destination ? `→ ${booking.search.destination}` : ""}
            </span>
          </div>

          {booking.status === "cancelled" ? (
            <p className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
              This booking was cancelled.
            </p>
          ) : (
            <ol className="mt-6 flex flex-col gap-4 rounded-xl bg-muted/40 p-4">
              {STAGES.map((stage, i) => {
                const done = i <= currentStageIndex;
                return (
                  <li key={stage.key} className="flex items-center gap-3">
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        done ? "font-semibold text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {stage.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Car className="h-4 w-4" />
              <span>{booking.vehicle.name}</span>
            </div>
            <span className="text-base font-bold text-foreground">
              {formatCurrency(booking.fare.total)}
            </span>
          </div>

          {booking.driverName ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Driver: {booking.driverName} · {booking.vehicleNumber}
            </p>
          ) : null}
        </Card>
      )}
    </div>
  );
}