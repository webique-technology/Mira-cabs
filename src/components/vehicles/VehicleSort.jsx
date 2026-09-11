"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Lowest Price" },
  { value: "rating-high", label: "Highest Rated" },
  { value: "capacity-high", label: "Maximum Capacity" },
];

export function VehicleSort({ value, onChange }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v)}>
      <SelectTrigger className="w-full sm:w-56" aria-label="Sort vehicles">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
