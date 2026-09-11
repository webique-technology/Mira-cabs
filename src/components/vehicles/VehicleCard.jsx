"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Briefcase,
  ChevronDown,
  ShieldCheck,
  Snowflake,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/common/Rating";
import { Badge } from "@/components/ui/badge";
import { FareBreakdown } from "@/components/vehicles/FareBreakdown";
import { formatCurrency } from "@/lib/utils";

export function VehicleCard({ vehicle, fare, onSelect, selecting }) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-auto sm:w-48">
        <Image
          src={vehicle.image}
          alt={`${vehicle.category} — ${vehicle.name}`}
          fill
          sizes="192px"
          className="object-cover"
        />
        {vehicle.instantConfirmation ? (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-success/90 px-2 py-1 text-[10px] font-bold text-white">
            <Zap className="h-3 w-3" /> Instant Confirm
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary-700">
              {vehicle.category}
            </p>
            <h3 className="text-lg font-bold text-secondary-900">
              {vehicle.name}
            </h3>
          </div>
          <Rating value={vehicle.rating} count={vehicle.ratingCount} />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-secondary-700">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {vehicle.seats} Seats
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" /> {vehicle.luggage} Bags
          </span>
          {vehicle.ac ? (
            <span className="flex items-center gap-1">
              <Snowflake className="h-3.5 w-3.5" /> AC
            </span>
          ) : null}
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> {vehicle.cancellationPolicy}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {vehicle.features.map((feature) => (
            <Badge key={feature} variant="muted">
              {feature}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Includes {vehicle.includedKm} km ·{" "}
          {formatCurrency(vehicle.extraKmRate)}/km after ·{" "}
          {formatCurrency(vehicle.driverAllowance)} driver allowance
        </p>
        <button
          type="button"
          onClick={() => setShowBreakdown((v) => !v)}
          aria-expanded={showBreakdown}
          className="flex w-fit items-center gap-1 text-xs font-semibold text-primary-700"
        >
          {showBreakdown ? "Hide" : "View"} fare breakup
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${showBreakdown ? "rotate-180" : ""}`}
          />
        </button>
        {showBreakdown ? <FareBreakdown fare={fare} /> : null}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <div>
            {vehicle.discount ? (
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(fare.total + vehicle.discount)}
              </p>
            ) : null}
            <p className="text-2xl font-extrabold text-secondary-900">
              {formatCurrency(fare.total)}
            </p>
          </div>
          <Button
            onClick={() => onSelect(vehicle)}
            disabled={selecting}
            size="lg"
          >
            {selecting ? "Selecting..." : "Select Cab"}
          </Button>
        </div>
      </div>
    </div>
  );
}
