"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { vehicleCategories } from "@/data/vehicles";

export function VehicleFilters({ filters, onChange, onReset }) {
  const toggleCategory = (category) => {
    const current = filters.categories ?? [];
    const next = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    onChange({ ...filters, categories: next });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-secondary-900">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8 px-2 text-xs"
        >
          Reset
        </Button>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Vehicle Type
        </p>
        <div className="flex flex-col gap-2.5">
          {vehicleCategories.map((category) => (
            <div key={category} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${category}`}
                checked={(filters.categories ?? []).includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />

              <Label
                htmlFor={`cat-${category}`}
                className="cursor-pointer text-sm font-normal"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Seating Capacity
        </p>
        <div className="flex flex-wrap gap-2">
          {[4, 6, 7, 12].map((seats) => (
            <button
              key={seats}
              type="button"
              onClick={() =>
                onChange({
                  ...filters,
                  minSeats: filters.minSeats === seats ? undefined : seats,
                })
              }
              className={`min-h-9 rounded-full border px-3 text-xs font-semibold transition-colors ${
                filters.minSeats === seats
                  ? "border-primary bg-primary text-secondary-900"
                  : "border-border text-secondary-700"
              }`}
            >
              {seats}+ Seats
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Maximum Price
        </p>
        <input
          type="range"
          min={1500}
          max={8000}
          step={250}
          value={filters.maxPrice ?? 8000}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-primary-600"
          aria-label="Maximum price"
        />

        <p className="mt-1 text-xs text-muted-foreground">
          Up to ₹{(filters.maxPrice ?? 8000).toLocaleString("en-IN")}
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="filter-ac"
            checked={Boolean(filters.acOnly)}
            onCheckedChange={(v) =>
              onChange({ ...filters, acOnly: Boolean(v) })
            }
          />
          <Label
            htmlFor="filter-ac"
            className="cursor-pointer text-sm font-normal"
          >
            Air Conditioning only
          </Label>
        </div>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="filter-instant"
            checked={Boolean(filters.instantConfirmationOnly)}
            onCheckedChange={(v) =>
              onChange({ ...filters, instantConfirmationOnly: Boolean(v) })
            }
          />

          <Label
            htmlFor="filter-instant"
            className="cursor-pointer text-sm font-normal"
          >
            Instant confirmation only
          </Label>
        </div>
      </div>
    </div>
  );
}
