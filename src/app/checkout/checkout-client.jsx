"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Loader2, ShieldCheck, Sparkles, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { FareBreakdown } from "@/components/vehicles/FareBreakdown";
import { CouponInput } from "@/components/checkout/CouponInput";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { EmptyState } from "@/components/common/EmptyState";
import { AuthModal } from "@/components/auth/AuthModal";
import { useBookingStore } from "@/store/booking-store";
import { calculateFare } from "@/services/vehicle-service";
import { createBooking } from "@/services/booking-service";
import { getRoutes } from "@/services/route-service";
import {
  computeOfferDiscount,
  resolveDays,
  resolveDistanceKm,
} from "@/lib/fare-helpers";
import { passengerSchema } from "@/lib/checkout-schema";

export function CheckoutClient() {
  const router = useRouter();
  const search = useBookingStore((s) => s.search);
  const vehicle = useBookingStore((s) => s.selectedVehicle);
  const appliedOffer = useBookingStore((s) => s.appliedOffer);
  const applyOffer = useBookingStore((s) => s.applyOffer);
  const resetCheckout = useBookingStore((s) => s.resetCheckout);

  const [routes, setRoutes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);

  // Strict check: Only treat as tour package if tripType matches AND package details actually exist
  const isTourPackage = Boolean(
    search?.tripType === "tour-package" && search?.packageDetails,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      alternateMobile: "",
      passengers: search?.passengers || 4,
      packageDate: search?.pickupDate || new Date().toISOString().split("T")[0],
      packageTime: search?.pickupTime || "09:00",
      pickupAddress: isTourPackage ? search?.pickup || "" : "",
      specialInstructions: "",
      paymentMethod: undefined,
      acceptedTerms: false,
    },
  });

  useEffect(() => {
    getRoutes().then(setRoutes);

    const saved = localStorage.getItem("mira_user");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u.name && u.name !== "User") setValue("fullName", u.name);
        if (u.phone) setValue("mobile", u.phone);
        if (u.email) setValue("email", u.email);
      } catch (e) {
        // ignore parse error
      }
    }
  }, [setValue]);

  const paymentMethod = watch("paymentMethod");
  const acceptedTerms = watch("acceptedTerms");
  const passengers = watch("passengers");
  const packageDate = watch("packageDate");
  const packageTime = watch("packageTime");
  const pickupAddress = watch("pickupAddress");

  const dynamicPickupName = useMemo(() => {
    if (!isTourPackage) return search?.pickup;
    if (!pickupAddress || !pickupAddress.trim())
      return search?.pickup || "Not Selected";

    const words = pickupAddress.trim().split(/\s+/);
    return words.slice(0, 2).join(" ");
  }, [isTourPackage, search?.pickup, pickupAddress]);

  // Derived search summary reflecting passenger counts and details in real-time
  const activeSearchSummary = useMemo(() => {
    if (!search) return null;

    // Standard cab / fleet booking: Never include tour package metadata
    if (!isTourPackage) {
      return {
        ...search,
        packageDetails: undefined,
        passengers: Number(passengers) || search.passengers || 1,
      };
    }

    // Tour Package booking
    return {
      ...search,
      pickup: dynamicPickupName,
      passengers: Number(passengers) || search.passengers || 1,
      pickupDate: packageDate || search.pickupDate,
      pickupTime: packageTime || search.pickupTime,
    };
  }, [
    search,
    dynamicPickupName,
    passengers,
    isTourPackage,
    packageDate,
    packageTime,
  ]);

  const fare = useMemo(() => {
    if (!search || !vehicle) return null;

    // Resolve distance with fallback to includedKm so custom routes never break the fare
    const resolvedKm = resolveDistanceKm(search, routes);
    const distanceKm =
      resolvedKm && resolvedKm > 0 ? resolvedKm : vehicle.includedKm || 150;

    const days =
      isTourPackage && search.packageDetails?.durationDays
        ? search.packageDetails.durationDays
        : resolveDays(search) || 1;

    const offerDiscount = appliedOffer
      ? computeOfferDiscount(appliedOffer, vehicle.baseFare)
      : 0;

    return calculateFare({
      vehicle,
      distanceKm,
      days,
      discountOverride: (vehicle.discount || 0) + offerDiscount,
    });
  }, [search, vehicle, routes, isTourPackage, appliedOffer]);

  if (!search || !vehicle || !fare) {
    return (
      <EmptyState
        title="Nothing to check out yet"
        description="Search for a trip or select a package and vehicle before proceeding to checkout."
        action={
          <Button asChild>
            <Link href="/packages">Explore Tour Packages</Link>
          </Button>
        }
      />
    );
  }

  const executeBookingCreation = async (values) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const finalAddress =
        values.pickupAddress || getValues("pickupAddress") || "";
      const finalDate =
        values.packageDate || getValues("packageDate") || search.pickupDate;
      const finalTime =
        values.packageTime || getValues("packageTime") || search.pickupTime;
      const finalPassengers =
        Number(values.passengers) ||
        Number(getValues("passengers")) ||
        search.passengers ||
        1;

      const finalSearch = {
        ...search,
        passengers: finalPassengers,
        packageDetails: isTourPackage ? search.packageDetails : undefined,
        tripType: isTourPackage
          ? "tour-package"
          : search.tripType === "tour-package"
            ? "one-way"
            : search.tripType,
        pickup:
          isTourPackage && finalAddress.trim()
            ? finalAddress.trim()
            : search.pickup,
        pickupDate: isTourPackage ? finalDate : search.pickupDate,
        pickupTime: isTourPackage ? finalTime : search.pickupTime,
      };

      const booking = await createBooking({
        search: finalSearch,
        vehicle,
        passenger: {
          fullName: values.fullName,
          mobile: values.mobile,
          email: values.email,
          alternateMobile: values.alternateMobile || undefined,
          specialInstructions: values.specialInstructions || undefined,
        },
        fare,
        paymentMethod: values.paymentMethod,
        couponCode: appliedOffer?.couponCode,
      });

      const currentUser = JSON.parse(localStorage.getItem("mira_user") || "{}");
      const updatedUserData = {
        ...currentUser,
        name: values.fullName?.trim() || currentUser.name || "User",
        email: values.email?.trim() || currentUser.email || "",
        phone: values.mobile?.trim() || currentUser.phone || "",
        role: "customer",
      };
      localStorage.setItem("mira_user", JSON.stringify(updatedUserData));
      window.dispatchEvent(new Event("auth-state-change"));

      const existingHistory = JSON.parse(
        localStorage.getItem("mira_user_bookings") || "[]",
      );
      const updatedHistory = [booking, ...existingHistory];
      localStorage.setItem(
        "mira_user_bookings",
        JSON.stringify(updatedHistory),
      );

      resetCheckout();
      router.push(`/booking-success?bookingId=${booking.id}`);
    } catch {
      setSubmitError("We couldn't confirm your booking. Please try again.");
      setSubmitting(false);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    const addressValue = values.pickupAddress || getValues("pickupAddress");

    if (isTourPackage && (!addressValue || !addressValue.trim())) {
      setSubmitError("Please enter your complete pickup address.");
      return;
    }

    const payload = {
      ...values,
      pickupAddress: isTourPackage ? addressValue : "",
      packageDate: values.packageDate || getValues("packageDate"),
      packageTime: values.packageTime || getValues("packageTime"),
      passengers: values.passengers || getValues("passengers"),
    };

    const savedUser = localStorage.getItem("mira_user");
    if (!savedUser) {
      setPendingValues(payload);
      setAuthModalOpen(true);
      return;
    }

    await executeBookingCreation(payload);
  });

  const handleAuthSuccess = async (userData) => {
    setAuthModalOpen(false);
    if (pendingValues) {
      const updatedValues = {
        ...pendingValues,
        mobile: pendingValues.mobile || userData.phone,
        fullName: pendingValues.fullName || userData.name || "User",
      };
      await executeBookingCreation(updatedValues);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]"
      >
        <div className="flex flex-col gap-6">
          {/* Tour Package Banner: Render ONLY for active tour packages */}
          {isTourPackage && search.packageDetails && (
            <div className="rounded-2xl border border-primary-200 bg-primary-50/50 p-5 shadow-soft">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-4 w-4" /> Tour Package Selected
              </div>
              <h2 className="mt-1 text-lg font-bold text-secondary-900">
                {search.packageDetails.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-secondary-700">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>
                    {search.packageDetails.durationDays} Days /{" "}
                    {search.packageDetails.durationNights} Nights
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>Itinerary Covered: {search.destination}</span>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Summary Card */}
          <BookingSummary search={activeSearchSummary} />

          {/* Selected Vehicle Card */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold text-secondary-900">
              Selected Vehicle
            </h3>
            <div className="mt-3 flex items-center gap-4">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-secondary-900">{vehicle.name}</p>
                <p className="text-xs text-muted-foreground">
                  {vehicle.category} · {vehicle.seats} Seats · {vehicle.luggage}{" "}
                  Bags
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Details Form */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold text-secondary-900">
              Passenger Details
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName ? (
                  <p
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.fullName.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  inputMode="numeric"
                  maxLength={10}
                  {...register("mobile")}
                  aria-invalid={Boolean(errors.mobile)}
                />
                {errors.mobile ? (
                  <p
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.mobile.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? (
                  <p
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="alternateMobile">
                  Alternate Number (optional)
                </Label>
                <Input
                  id="alternateMobile"
                  inputMode="numeric"
                  maxLength={10}
                  {...register("alternateMobile")}
                  aria-invalid={Boolean(errors.alternateMobile)}
                />
                {errors.alternateMobile ? (
                  <p
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.alternateMobile.message}
                  </p>
                ) : null}
              </div>

              {/* Tour Package Fields: 3-column sub-grid */}
              {isTourPackage && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="packageDate">Pickup Date</Label>
                      <Input
                        id="packageDate"
                        type="date"
                        {...register("packageDate")}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="packageTime">Pickup Time</Label>
                      <Input
                        id="packageTime"
                        type="time"
                        {...register("packageTime")}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="passengers">Number of Passengers</Label>
                      <Input
                        id="passengers"
                        type="number"
                        min={1}
                        max={vehicle?.seats || 8}
                        {...register("passengers")}
                        placeholder={`1 to ${vehicle?.seats || 8}`}
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Vehicle accommodates up to {vehicle?.seats || 8}{" "}
                        passengers.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label htmlFor="pickupAddress">
                      Pickup Address / Landmark
                    </Label>
                    <Input
                      id="pickupAddress"
                      placeholder="e.g. Nashik road, deolali gaon, Mahavir kirana store"
                      {...register("pickupAddress")}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Enter your full pickup location to schedule your tour
                      driver.
                    </p>
                  </div>
                </>
              )}

              {/* Standard Cab / Fleet Booking: Render single passenger counter */}
              {!isTourPackage && (
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min={1}
                    max={vehicle?.seats || 8}
                    {...register("passengers")}
                    placeholder={`1 to ${vehicle?.seats || 8}`}
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Vehicle accommodates up to {vehicle?.seats || 8} passengers.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="specialInstructions">
                  Special Instructions (optional)
                </Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="e.g. Need Hindi/English speaking driver, senior citizen traveling, etc."
                  {...register("specialInstructions")}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold text-secondary-900">
              Payment Method
            </h3>
            <div className="mt-4">
              <PaymentMethodSelector
                value={paymentMethod}
                onChange={(v) =>
                  setValue("paymentMethod", v, { shouldValidate: true })
                }
              />
            </div>
            {errors.paymentMethod ? (
              <p
                role="alert"
                className="mt-2 text-xs font-medium text-destructive"
              >
                {errors.paymentMethod.message}
              </p>
            ) : null}
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-5">
            <Checkbox
              id="acceptedTerms"
              checked={Boolean(acceptedTerms)}
              onCheckedChange={(v) =>
                setValue("acceptedTerms", v === true, { shouldValidate: true })
              }
            />
            <Label
              htmlFor="acceptedTerms"
              className="cursor-pointer text-sm font-normal leading-relaxed"
            >
              I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                className="font-semibold text-primary-700 underline"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/cancellation-policy"
                className="font-semibold text-primary-700 underline"
              >
                Cancellation Policy
              </Link>
              .
            </Label>
          </div>
          {errors.acceptedTerms ? (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errors.acceptedTerms.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <FareBreakdown fare={fare} />
          {submitError ? (
            <p role="alert" className="text-sm font-medium text-destructive">
              {submitError}
            </p>
          ) : null}
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full rounded-2xl"
          >
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            {submitting ? "Confirming Booking..." : "Confirm Booking"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Your payment details are never stored by Mira Cabs.
          </p>
        </div>
      </form>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
