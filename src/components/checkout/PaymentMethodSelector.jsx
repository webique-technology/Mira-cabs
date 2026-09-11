"use client";

import {
  Banknote,
  CreditCard,
  Landmark,
  Smartphone,
  Wallet,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const METHODS = [
  { value: "upi", label: "UPI", icon: Smartphone },
  { value: "credit-card", label: "Credit Card", icon: CreditCard },
  { value: "debit-card", label: "Debit Card", icon: CreditCard },
  { value: "net-banking", label: "Net Banking", icon: Landmark },
  { value: "wallet", label: "Wallet", icon: Wallet },
  { value: "cash", label: "Cash to Driver", icon: Banknote },
];

export function PaymentMethodSelector({ value, onChange }) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onChange(v)}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
    >
      {METHODS.map((method) => (
        <Label
          key={method.value}
          htmlFor={`pay-${method.value}`}
          className={cn(
            "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-border p-3 text-sm font-medium",
            value === method.value && "border-primary bg-primary-50",
          )}
        >
          <RadioGroupItem value={method.value} id={`pay-${method.value}`} />
          <method.icon className="h-4 w-4 text-secondary-700" />
          {method.label}
        </Label>
      ))}
    </RadioGroup>
  );
}
