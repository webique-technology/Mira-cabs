"use client";

import { Minus, Plus, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function PassengerSelector({
  id,
  label = "Passengers",
  value,
  onChange,
  min = 1,
  max = 12,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-secondary-800">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            className="flex h-10 w-full items-center gap-2.5 rounded-md border border-input bg-background px-4 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {value} {value === 1 ? "Passenger" : "Passengers"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-secondary-900">
              Passengers
            </span>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-9 w-9"
                disabled={value <= min}
                onClick={() => onChange(Math.max(min, value - 1))}
                aria-label="Decrease passengers"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-4 text-center text-sm font-bold">{value}</span>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-9 w-9"
                disabled={value >= max}
                onClick={() => onChange(Math.min(max, value + 1))}
                aria-label="Increase passengers"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
