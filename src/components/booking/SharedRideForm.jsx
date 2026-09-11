"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight, Check, Loader2, Search, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationAutocomplete } from "@/components/booking/LocationAutocomplete";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimePicker } from "@/components/booking/TimePicker";
import { PassengerSelector } from "@/components/booking/PassengerSelector";
import { sharedRideSchema } from "@/lib/booking-schemas";

export function SharedRideForm({
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
    resolver: zodResolver(sharedRideSchema),
    defaultValues: {
      pickup: initialData.pickup || "",
      destination: initialData.destination || "",
      pickupDate: initialData.pickupDate || "",
      pickupTime: initialData.pickupTime || "09:00",
      passengers: initialData.passengers || 1,
    },
  });

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

  const values = watch();

  const onSubmit = handleSubmit((data) => {
    onSearch({ tripType: "shared", ...data });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <p className="flex items-center self-center gap-1.5 text-xs font-medium text-white">
        <Users2 className="h-3.5 w-3.5" /> Shared rides pool up to 3 passengers
        on the same route for a lower per-seat fare.
      </p>
      <div className="grid grid-cols-1 gap-4 gap-x-0 md:gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:items-start">
        <div className="relative sm:col-span-2 md:col-span-3 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <LocationAutocomplete
              id="sh-pickup"
              label="Pickup Location"
              placeholder="e.g. Nashik Road"
              value={values.pickup}
              onChange={(v) => setValue("pickup", v, { shouldValidate: true })}
              error={errors.pickup?.message}
            />
            <LocationAutocomplete
              id="sh-destination"
              label="Destination"
              placeholder="e.g. Mumbai Airport"
              value={values.destination}
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
              setValue("pickup", values.destination, { shouldValidate: true });
              setValue("destination", values.pickup, { shouldValidate: true });
            }}
            className="absolute right-1/2 top-7 z-10 hidden h-9 w-9 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background shadow-soft sm:flex"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary-600" />
          </button>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-x-4">
          <DatePicker
            id="sh-date"
            label="Date"
            value={values.pickupDate}
            onChange={(v) =>
              setValue("pickupDate", v, { shouldValidate: true })
            }
            error={errors.pickupDate?.message}
          />
          <TimePicker
            id="sh-time"
            label="Time"
            value={values.pickupTime}
            onChange={(v) =>
              setValue("pickupTime", v, { shouldValidate: true })
            }
            error={errors.pickupTime?.message}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <PassengerSelector
            id="sh-passengers"
            value={values.passengers}
            onChange={(v) => setValue("passengers", v)}
            max={Math.min(maxPassengers || 3, 3)}
          />
        </div>
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
