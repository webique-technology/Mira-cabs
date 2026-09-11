"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight, Check, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationAutocomplete } from "@/components/booking/LocationAutocomplete";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimePicker } from "@/components/booking/TimePicker";
import { PassengerSelector } from "@/components/booking/PassengerSelector";
import { oneWaySchema } from "@/lib/booking-schemas";

export function OneWayForm({
  onSearch,
  submitting,
  submitLabel,
  maxPassengers,
  initialData = {},
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(oneWaySchema),
    defaultValues: {
      pickup: initialData.pickup || "",
      destination: initialData.destination || "",
      pickupDate: initialData.pickupDate || "",
      pickupTime: initialData.pickupTime || "09:00",
      passengers: initialData.passengers || 1,
    },
  });

  // Re-sync values if initialData updates
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset({
        pickup: initialData.pickup || "",
        destination: initialData.destination || "",
        pickupDate: initialData.pickupDate || "",
        pickupTime: initialData.pickupTime || "09:00",
        passengers: Number(initialData.passengers) || 1,
      });
    }
  }, [initialData, reset]);

  const pickup = watch("pickup");
  const destination = watch("destination");
  const passengers = watch("passengers");
  const pickupDate = watch("pickupDate");
  const pickupTime = watch("pickupTime");

  const onSubmit = handleSubmit((values) => {
    onSearch({ tripType: "one-way", ...values });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-4 gap-x-0 md:gap-x-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <LocationAutocomplete
              id="ow-pickup"
              label="Pickup City"
              placeholder="e.g. Nashik"
              value={pickup}
              onChange={(v) => setValue("pickup", v, { shouldValidate: true })}
              error={errors.pickup?.message}
            />
            <LocationAutocomplete
              id="ow-destination"
              label="Destination City"
              placeholder="e.g. Mumbai"
              value={destination}
              onChange={(v) =>
                setValue("destination", v, { shouldValidate: true })
              }
              error={errors.destination?.message}
            />
          </div>
          <button
            type="button"
            aria-label="Swap pickup and destination"
            onClick={() => {
              setValue("pickup", destination, { shouldValidate: true });
              setValue("destination", pickup, { shouldValidate: true });
            }}
            className="absolute -top-1 right-1/2 top-7 z-10 hidden h-9 w-9 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background shadow-soft sm:flex"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary-600" />
          </button>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-x-4">
          <DatePicker
            id="ow-date"
            label="Pickup Date"
            value={pickupDate}
            onChange={(v) =>
              setValue("pickupDate", v, { shouldValidate: true })
            }
            error={errors.pickupDate?.message}
          />
          <TimePicker
            id="ow-time"
            label="Pickup Time"
            value={pickupTime}
            onChange={(v) =>
              setValue("pickupTime", v, { shouldValidate: true })
            }
            error={errors.pickupTime?.message}
          />
        </div>
        <PassengerSelector
          id="ow-passengers"
          value={passengers}
          max={maxPassengers || 12}
          onChange={(v) => setValue("passengers", v)}
        />
        <input
          type="hidden"
          {...register("passengers", { valueAsNumber: true })}
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
