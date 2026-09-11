"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const SERVICE_CHIPS = [
//   "Outstation Cab",
//   "Airport Transfer",
//   "Corporate Tie-up",
//   "Tour Packages",
//   "Feedback / Lost Item",
//   "Driver Partner",
// ];

const VEHICLE_CATEGORIES = [
  "Sedan (Dzire / Etios) • 4 Seater",
  "Premium Sedan (Slavia / Verna)",
  "Comfort SUV (Ertiga / Carens) • 6 Seater",
  "Executive Innova Hycross / Crysta",
  "Help Me Choose",
];

export function ContactFormClient() {
  // const [selectedService, setSelectedService] = useState("Outstation Cab");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    route: "",
    travelDate: "",
    vehicleClass: VEHICLE_CATEGORIES[0],
    message: "",
    // whatsappUpdates: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API dispatch submission
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-md sm:p-10">
      <div className="mb-8 flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Concierge Inquiry
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-secondary-900 sm:text-3xl">
          Send Us a Message
        </h2>
        {/* <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Our dedicated highway dispatch officer will review your request and
          reply within 15 minutes.
        </p> */}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Service Type Chips */}
        {/* <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Trip or Service Category
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_CHIPS.map((chip) => {
              const isSelected = selectedService === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSelectedService(chip)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "border border-border/80 bg-muted/60 text-secondary-700 hover:border-border hover:bg-muted hover:text-secondary-900",
                  )}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div> */}

        {/* Name and Phone Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="text-xs font-semibold text-secondary-900"
            >
              Your Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kulkarni"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phoneNumber"
              className="text-xs font-semibold text-secondary-900"
            >
              Phone Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-xl border border-r-0 border-input bg-muted px-3.5 text-xs font-semibold text-muted-foreground">
                +91
              </span>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="98220 12345"
                className="w-full rounded-r-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Email and Route Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-secondary-900"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ramesh@company.com"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="route"
              className="text-xs font-semibold text-secondary-900"
            >
              Route / Cities (Optional)
            </label>
            <input
              id="route"
              name="route"
              type="text"
              value={formData.route}
              onChange={handleChange}
              placeholder="e.g. Nashik to Mumbai Airport T2"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Travel Date & Vehicle Class Preference */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="travelDate"
              className="text-xs font-semibold text-secondary-900"
            >
              Approximate Date of Travel
            </label>
            <input
              id="travelDate"
              name="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="vehicleClass"
              className="text-xs font-semibold text-secondary-900"
            >
              Preferred Cab Category
            </label>
            <select
              id="vehicleClass"
              name="vehicleClass"
              value={formData.vehicleClass}
              onChange={handleChange}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {VEHICLE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message Body */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-xs font-semibold text-secondary-900"
          >
            Trip Notes or Special Inquiries *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us pickup location details, flight times, halts at Shirdi/Trimbakeshwar, or GST requirements..."
            className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* WhatsApp Updates Checkbox */}
        {/* <div className="flex items-start gap-3 pt-1">
          <input
            id="whatsappUpdates"
            name="whatsappUpdates"
            type="checkbox"
            checked={formData.whatsappUpdates}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-input text-primary accent-primary focus:ring-primary"
          />
          <label
            htmlFor="whatsappUpdates"
            className="cursor-pointer select-none text-xs leading-relaxed text-muted-foreground"
          >
            Send instantaneous confirmation, fare breakdown quotes, and driver
            location updates to my WhatsApp.
          </label>
        </div> */}

        {/* Submit Action Button */}
        <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full gap-2 rounded-xl font-semibold sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Send Inquiry &amp; Get Callback</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span>Your contact details are 100% private.</span>
          </div>
        </div>

        {/* Success Banner Notification */}
        {submitted && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-900">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <strong>Thank you!</strong> Your inquiry has been routed to our
              dispatch center. A concierge will call or message your WhatsApp
              within 15 minutes.
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
