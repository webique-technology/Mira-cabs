"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Car, MapPinned, PlaneTakeoff, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OneWayForm } from "@/components/booking/OneWayForm";
import { RoundTripForm } from "@/components/booking/RoundTripForm";
import { LocalRentalForm } from "@/components/booking/LocalRentalForm";
import { AirportForm } from "@/components/booking/AirportForm";
import { SharedRideForm } from "@/components/booking/SharedRideForm";
import { useBookingStore } from "@/store/booking-store";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "one-way", label: "One Way", icon: Car },
  { value: "round-trip", label: "Round Trip", icon: MapPinned },
  { value: "local", label: "Local", icon: Building2 },
  { value: "airport", label: "Airport", icon: PlaneTakeoff },
  { value: "shared", label: "Shared Ride", icon: Users },
];

export function BookingWidget({
  variant = "hero",
  className,
  onComplete,
  submitLabel,
  maxPassengers,
  initialData = {},
  lockedTripType, // <--- When passed from /services/[slug], locks to this service only
}) {
  const router = useRouter();
  const setSearch = useBookingStore((state) => state.setSearch);
  const [submitting, setSubmitting] = useState(false);

  const effectiveTripType =
    lockedTripType || initialData?.tripType || "one-way";
  const [activeTab, setActiveTab] = useState(effectiveTripType);

  // Keep active tab synced if lockedTripType or initialData changes
  useEffect(() => {
    if (lockedTripType) {
      setActiveTab(lockedTripType);
    } else if (initialData?.tripType) {
      setActiveTab(initialData.tripType);
    }
  }, [lockedTripType, initialData?.tripType]);

  const handleSearch = (searchData) => {
    setSubmitting(true);

    if (typeof onComplete === "function") {
      onComplete(searchData);
      return;
    }

    setSearch(searchData);
    router.push("/search");
  };

  const formKey = `${effectiveTripType}-${initialData?.pickup || "pick"}-${initialData?.destination || "dest"}`;

  return (
    <div className={cn(!lockedTripType && "mt-3")}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          // Disallow changing tabs if locked
          if (!lockedTripType) {
            setActiveTab(value);
          }
        }}
        className="flex flex-col items-start justify-center"
      >
        {/* Only show tab selector if NOT locked to a specific service */}
        {!lockedTripType && (
          <TabsList
            className="w-full overflow-x-auto rounded-lg sm:w-fit bg-black/0"
            aria-label="Trip type"
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-1.5 rounded-md bg-white text-secondary-900 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        <div
          className={cn(
            "w-full rounded-2xl border border-black/10 bg-black p-4 shadow-premium sm:p-6",
            !lockedTripType && "mt-4",
            variant === "hero" && "glass border-white/30 bg-black/50",
            variant === "modal" &&
              "border-border bg-card text-card-foreground shadow-none p-4 sm:p-6 overflow-visible",
            className,
          )}
        >
          {/* If locked, render ONLY that specific form; otherwise allow all tabs */}
          {(!lockedTripType || lockedTripType === "one-way") && (
            <TabsContent value="one-way">
              <OneWayForm
                key={`ow-${formKey}`}
                onSearch={handleSearch}
                submitting={submitting}
                submitLabel={submitLabel}
                maxPassengers={maxPassengers}
                initialData={initialData}
              />
            </TabsContent>
          )}

          {(!lockedTripType || lockedTripType === "round-trip") && (
            <TabsContent value="round-trip">
              <RoundTripForm
                key={`rt-${formKey}`}
                onSearch={handleSearch}
                submitting={submitting}
                submitLabel={submitLabel}
                maxPassengers={maxPassengers}
                initialData={initialData}
              />
            </TabsContent>
          )}

          {(!lockedTripType || lockedTripType === "local") && (
            <TabsContent value="local">
              <LocalRentalForm
                key={`local-${formKey}`}
                onSearch={handleSearch}
                submitting={submitting}
                submitLabel={submitLabel}
                maxPassengers={maxPassengers}
                initialData={initialData}
              />
            </TabsContent>
          )}

          {(!lockedTripType || lockedTripType === "airport") && (
            <TabsContent value="airport">
              <AirportForm
                key={`airport-${formKey}`}
                onSearch={handleSearch}
                submitting={submitting}
                submitLabel={submitLabel}
                maxPassengers={maxPassengers}
                initialData={initialData}
              />
            </TabsContent>
          )}

          {(!lockedTripType || lockedTripType === "shared") && (
            <TabsContent value="shared">
              <SharedRideForm
                key={`shared-${formKey}`}
                onSearch={handleSearch}
                submitting={submitting}
                submitLabel={submitLabel}
                maxPassengers={maxPassengers}
                initialData={initialData}
              />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}
