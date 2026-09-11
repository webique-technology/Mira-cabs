"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { VehicleSort } from "@/components/vehicles/VehicleSort";
import { EmptyState } from "@/components/common/EmptyState";
import { VehicleCardSkeleton } from "@/components/common/LoadingSkeleton";
import { useBookingStore } from "@/store/booking-store";
import { calculateFare, getVehicles } from "@/services/vehicle-service";
import { getRoutes } from "@/services/route-service";
import { getOffers } from "@/services/booking-service";
import { resolveDays, resolveDistanceKm } from "@/lib/fare-helpers";

export function VehicleResults({ showFilters = true }) {
  const router = useRouter();
  const search = useBookingStore((state) => state.search);
  const selectVehicle = useBookingStore((state) => state.selectVehicle);

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [offer, setOffer] = useState(null);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("recommended");
  const [selectingId, setSelectingId] = useState(null);

  useEffect(() => {
    getRoutes().then(setRoutes);
    getOffers().then((offers) => setOffer(offers[0] ?? null));
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getVehicles(filters, sort).then((results) => {
      if (active) {
        setVehicles(results);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [filters, sort]);

  const distanceKm = useMemo(
    () => (search ? resolveDistanceKm(search, routes) : 0),
    [search, routes]
  );
  
  const days = useMemo(() => {
    if (!search) return 1;
    if (search.tripType === "tour-package" && search.packageDetails?.durationDays) {
      return search.packageDetails.durationDays;
    }
    return resolveDays(search);
  }, [search]);

  const handleSelect = (vehicle) => {
    setSelectingId(vehicle.id);
    selectVehicle(vehicle);
    setTimeout(() => router.push("/checkout"), 350);
  };

  if (!search) {
    return (
      <EmptyState
        title="No active search"
        description="Start by selecting a tour package or entering your trip details."
        action={
          <Button asChild>
            <Link href="/packages">Explore Tour Packages</Link>
          </Button>
        }
      />
    );
  }

  const isTourPackage = search.tripType === "tour-package";

  return (
    <div className="flex flex-col gap-6">
      {/* Active Package Banner */}
      {isTourPackage && search.packageDetails && (
        <div className="flex items-center justify-between rounded-2xl border border-primary-200 bg-primary-50/60 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Selected Package
              </p>
              <h3 className="text-base font-bold text-secondary-900">
                {search.packageDetails.title}
              </h3>
            </div>
          </div>
          <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-secondary-800 shadow-sm">
            {search.packageDetails.durationDays} Days / {search.packageDetails.durationNights} Nights
          </span>
        </div>
      )}

      <BookingSummary search={search} />

      {/* {offer ? (
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-primary-300 bg-primary-50 px-4 py-3 text-sm">
          <Tag className="h-4 w-4 shrink-0 text-primary-700" />
          <p className="text-secondary-800">
            Use code <span className="font-bold">{offer.couponCode}</span> at
            checkout for {offer.discountLabel.toLowerCase()}.
          </p>
        </div>
      ) : null} */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {loading
            ? "Searching cabs..."
            : `${vehicles.length} cab${vehicles.length === 1 ? "" : "s"} available`}
        </p>
        <div className="flex items-center gap-2">
          {showFilters ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-6">
                <SheetTitle>Filter Cabs</SheetTitle>
                <div className="mt-4">
                  <VehicleFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={() => setFilters({})}
                  />
                </div>
              </SheetContent>
            </Sheet>
          ) : null}
          <VehicleSort value={sort} onChange={setSort} />
        </div>
      </div>

      <div
        className={
          showFilters
            ? "grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]"
            : "grid grid-cols-1 gap-6"
        }
      >
        {showFilters ? (
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
              <VehicleFilters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters({})}
              />
            </div>
          </aside>
        ) : null}

        <div className="flex flex-col gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))
          ) : vehicles.length === 0 ? (
            <EmptyState
              title="No cabs match your filters"
              description="Try adjusting your filters or resetting them to see more options."
              action={
                <Button onClick={() => setFilters({})}>Reset Filters</Button>
              }
            />
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                fare={calculateFare({ vehicle, distanceKm, days })}
                onSelect={handleSelect}
                selecting={selectingId === vehicle.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}