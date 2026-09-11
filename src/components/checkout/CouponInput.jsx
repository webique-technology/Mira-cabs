"use client";

import { useState } from "react";
import { Check, Loader2, Tag, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateCoupon } from "@/services/booking-service";

export function CouponInput({ appliedOffer, onApply }) {
  const [code, setCode] = useState(appliedOffer?.couponCode ?? "");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);

  const handleApply = async () => {
    if (!code.trim()) return;
    setChecking(true);
    setError(null);
    const offer = await validateCoupon(code);
    setChecking(false);
    if (!offer) {
      setError("This coupon code is invalid or has expired.");
      onApply(null);
      return;
    }
    onApply(offer);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="flex items-center gap-1.5 text-sm font-bold text-secondary-900">
        <Tag className="h-4 w-4" /> Have a coupon code?
      </h3>
      <div className="mt-3 flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          aria-label="Coupon code"
          disabled={Boolean(appliedOffer)}
        />

        {appliedOffer ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onApply(null);
              setCode("");
              setError(null);
            }}
          >
            <X className="mr-1.5 h-4 w-4" /> Remove
          </Button>
        ) : (
          <Button type="button" onClick={handleApply} disabled={checking}>
            {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
          </Button>
        )}
      </div>
      {appliedOffer ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
          <Check className="h-3.5 w-3.5" /> {appliedOffer.discountLabel} applied
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-2 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
