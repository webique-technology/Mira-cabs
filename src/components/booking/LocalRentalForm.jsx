"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationAutocomplete } from "@/components/booking/LocationAutocomplete";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimePicker } from "@/components/booking/TimePicker";
import { PassengerSelector } from "@/components/booking/PassengerSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { localRentalSchema, rentalPackages } from "@/lib/booking-schemas";

export function LocalRentalForm({
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
    resolver: zodResolver(localRentalSchema),
    defaultValues: {
      pickup: initialData.pickup || "",
      pickupDate: initialData.pickupDate || "",
      pickupTime: initialData.pickupTime || "09:00",
      rentalPackage: initialData.rentalPackage || "",
      passengers: initialData.passengers || 1,
    },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset({
        pickup: initialData.pickup || "",
        pickupDate: initialData.pickupDate || "",
        pickupTime: initialData.pickupTime || "09:00",
        rentalPackage: initialData.rentalPackage || "",
        passengers: Number(initialData.passengers) || 1,
      });
    }
  }, [initialData, reset]);

  const values = watch();

  const onSubmit = handleSubmit((data) => {
    onSearch({ tripType: "local", ...data });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-4 gap-x-0 sm:gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:items-start">
        <div className="col-span-2 md:col-span-1">
          <LocationAutocomplete
            id="local-city"
            label="City"
            placeholder="e.g. Nashik"
            value={values.pickup}
            onChange={(v) => setValue("pickup", v, { shouldValidate: true })}
            error={errors.pickup?.message}
          />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <DatePicker
            id="local-date"
            label="Date"
            value={values.pickupDate}
            onChange={(v) =>
              setValue("pickupDate", v, { shouldValidate: true })
            }
            error={errors.pickupDate?.message}
          />
          <TimePicker
            id="local-time"
            label="Time"
            value={values.pickupTime}
            onChange={(v) =>
              setValue("pickupTime", v, { shouldValidate: true })
            }
            error={errors.pickupTime?.message}
          />
        </div>
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5">
          <label
            htmlFor="local-package"
            className="text-sm font-semibold text-secondary-800"
          >
            Rental Package
          </label>
          <Select
            value={values.rentalPackage}
            onValueChange={(v) =>
              setValue("rentalPackage", v, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="local-package"
              aria-invalid={Boolean(errors.rentalPackage)}
            >
              <SelectValue placeholder="Select package" />
            </SelectTrigger>
            <SelectContent>
              {rentalPackages.map((pkg) => (
                <SelectItem key={pkg.value} value={pkg.value}>
                  {pkg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.rentalPackage ? (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.rentalPackage.message}
            </p>
          ) : null}
        </div>
        <PassengerSelector
          id="local-passengers"
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
