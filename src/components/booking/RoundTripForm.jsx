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
import { roundTripSchema } from "@/lib/booking-schemas";

export function RoundTripForm({
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
    resolver: zodResolver(roundTripSchema),
    defaultValues: {
      pickup: initialData.pickup || "",
      destination: initialData.destination || "",
      pickupDate: initialData.pickupDate || "",
      returnDate: initialData.returnDate || "",
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
        returnDate: initialData.returnDate || "",
        pickupTime: initialData.pickupTime || "09:00",
        passengers: Number(initialData.passengers) || 1,
      });
    }
  }, [initialData, reset]);

  const values = watch();

  const onSubmit = handleSubmit((data) => {
    onSearch({ tripType: "round-trip", ...data });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <LocationAutocomplete
              id="rt-pickup"
              label="Pickup City"
              placeholder="e.g. Pune"
              value={values.pickup}
              onChange={(v) => setValue("pickup", v, { shouldValidate: true })}
              error={errors.pickup?.message}
            />
            <LocationAutocomplete
              id="rt-destination"
              label="Destination City"
              placeholder="e.g. Mahabaleshwar"
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
        <div className="col-span-1 grid grid-cols-2 gap-x-4">
          <DatePicker
            id="rt-date"
            label="Departure Date"
            value={values.pickupDate}
            onChange={(v) =>
              setValue("pickupDate", v, { shouldValidate: true })
            }
            error={errors.pickupDate?.message}
          />
          <DatePicker
            id="rt-return"
            label="Return Date"
            value={values.returnDate}
            min={values.pickupDate || undefined}
            onChange={(v) =>
              setValue("returnDate", v, { shouldValidate: true })
            }
            error={errors.returnDate?.message}
          />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-x-4">
          <TimePicker
            id="rt-time"
            label="Pickup Time"
            value={values.pickupTime}
            onChange={(v) =>
              setValue("pickupTime", v, { shouldValidate: true })
            }
            error={errors.pickupTime?.message}
          />
          <PassengerSelector
            id="rt-passengers"
            value={values.passengers}
            max={maxPassengers || 8}
            onChange={(v) => setValue("passengers", v)}
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
