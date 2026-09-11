"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FleetCard } from "@/components/fleet/FleetCard";
import { vehicleCategories } from "@/data/vehicles";
import { cn } from "@/lib/utils";

export function FleetClient({ initialVehicles = [] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam && vehicleCategories.includes(categoryParam)
      ? categoryParam
      : "all",
  );

  // Sync state whenever the URL search param changes
  useEffect(() => {
    if (categoryParam && vehicleCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam) {
      setSelectedCategory("all");
    }
  }, [categoryParam]);

  const filterTabs = useMemo(() => {
    return [
      { id: "all", label: "All Vehicles" },
      ...vehicleCategories.map((cat) => ({ id: cat, label: cat })),
    ];
  }, []);

  const filteredVehicles = useMemo(() => {
    if (selectedCategory === "all") return initialVehicles;
    return initialVehicles.filter(
      (vehicle) =>
        vehicle.category.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [initialVehicles, selectedCategory]);

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* Category Pill Tabs */}
      <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {filterTabs.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm",
                isActive
                  ? "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 text-primary-700"
                  : "border border-border/80 bg-muted/60 text-secondary-700 hover:border-border hover:bg-muted hover:text-secondary-900",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Vehicle Grid */}
      <div className="fleet-grid mt-8 grid w-full grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No vehicles found for the selected category.
          </div>
        )}
      </div>
    </div>
  );
}