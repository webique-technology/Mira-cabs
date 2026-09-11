"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Loader2,
  PlaneLanding,
  PlaneTakeoff,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationAutocomplete } from "@/components/booking/LocationAutocomplete";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimePicker } from "@/components/booking/TimePicker";
import { PassengerSelector } from "@/components/booking/PassengerSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { airportSchema } from "@/lib/booking-schemas";
import { airports } from "@/data/airports";
import { cn } from "@/lib/utils";

export function AirportForm({
  onSearch,
  submitting,
  submitLabel,
  maxPassengers,
  initialData = {},
}) {
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(airportSchema),
    defaultValues: {
      airportType: initialData.airportType || "pickup",
      airport: initialData.airport || "",
      pickup: initialData.pickup || "",
      terminal: initialData.terminal || "",
      pickupDate: initialData.pickupDate || "",
      pickupTime: initialData.pickupTime || "09:00",
      flightNumber: initialData.flightNumber || "",
      passengers: initialData.passengers || 1,
    },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset({
        airportType: initialData.airportType || "pickup",
        airport: initialData.airport || "",
        pickup: initialData.pickup || "",
        terminal: initialData.terminal || "",
        pickupDate: initialData.pickupDate || "",
        pickupTime: initialData.pickupTime || "09:00",
        flightNumber: initialData.flightNumber || "",
        passengers: Number(initialData.passengers) || 1,
      });
    }
  }, [initialData, reset]);

  const values = watch();
  const selectedAirport = airports.find((a) => a.name === values.airport);

  const onSubmit = handleSubmit((data) => {
    onSearch({ tripType: "airport", ...data });
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col items-center gap-4"
    >
      <div className="inline-flex w-fit rounded-full bg-muted p-1">
        {["pickup", "drop"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setValue("airportType", type)}
            className={cn(
              "flex p-1 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors",
              values.airportType === type
                ? "bg-secondary text-white shadow-soft"
                : "text-muted-foreground",
            )}
          >
            {type === "pickup" ? (
              <PlaneLanding className="h-4 w-4" />
            ) : (
              <PlaneTakeoff className="h-4 w-4" />
            )}
            Airport {type === "pickup" ? "Pickup" : "Drop"}
          </button>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:items-start justify-center">
        <div className="flex flex-col gap-1.5 col-span-2">
          <Label htmlFor="airport-select">Airport</Label>
          <Select
            value={values.airport}
            onValueChange={(v) =>
              setValue("airport", v, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="airport-select"
              aria-invalid={Boolean(errors.airport)}
            >
              <SelectValue placeholder="Select airport" />
            </SelectTrigger>
            <SelectContent>
              {airports.map((airport) => (
                <SelectItem key={airport.id} value={airport.name}>
                  {airport.city} — {airport.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.airport ? (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.airport.message}
            </p>
          ) : null}
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <LocationAutocomplete
            id="airport-city"
            label={
              values.airportType === "pickup" ? "Drop City" : "Pickup City"
            }
            placeholder="e.g. Nashik"
            value={values.pickup}
            onChange={(v) => setValue("pickup", v, { shouldValidate: true })}
            error={errors.pickup?.message}
          />

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="airport-terminal"
              className="text-sm font-semibold text-secondary-800"
            >
              Terminal
            </Label>
            <Select
              value={values.terminal}
              onValueChange={(v) =>
                setValue("terminal", v, { shouldValidate: true })
              }
              disabled={!selectedAirport}
            >
              <SelectTrigger
                id="airport-terminal"
                aria-invalid={Boolean(errors.terminal)}
              >
                <SelectValue placeholder="Terminal" />
              </SelectTrigger>
              <SelectContent>
                {(selectedAirport?.terminals ?? []).map((terminal) => (
                  <SelectItem key={terminal} value={terminal}>
                    {terminal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <DatePicker
            id="airport-date"
            label="Date"
            value={values.pickupDate}
            onChange={(v) =>
              setValue("pickupDate", v, { shouldValidate: true })
            }
            error={errors.pickupDate?.message}
          />
          <TimePicker
            id="airport-time"
            label="Time"
            value={values.pickupTime}
            onChange={(v) =>
              setValue("pickupTime", v, { shouldValidate: true })
            }
            error={errors.pickupTime?.message}
          />
        </div>
      </div>
      <div className="w-full md:w-fit grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="airport-flight"
            className="text-sm font-semibold text-secondary-800"
          >
            Flight Number
          </Label>
          <Input
            id="airport-flight"
            placeholder="e.g. AI-2847"
            value={values.flightNumber}
            onChange={(e) =>
              setValue("flightNumber", e.target.value, { shouldValidate: true })
            }
            aria-invalid={Boolean(errors.flightNumber)}
          />

          {errors.flightNumber ? (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.flightNumber.message}
            </p>
          ) : null}
        </div>
        <PassengerSelector
          id="airport-passengers"
          value={values.passengers}
          max={maxPassengers || 8}
          onChange={(v) => setValue("passengers", v)}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-fit items-center self-center mt-3 justify-center"
      >
        {submitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : submitLabel ? (
          <Check className="mr-2 h-4 w-4" />
        ) : (
          <Search className="mr-2 h-4 w-4" />
        )}
        {submitting ? "Processing..." : submitLabel || "Search Cabs"}
      </Button>
    </form>
  );
}
