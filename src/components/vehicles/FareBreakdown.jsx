import { Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const ROWS = [
  { key: "baseFare", label: "Base Fare" },
  { key: "distanceCharge", label: "Extra Distance Charge" },
  { key: "driverAllowance", label: "Driver Allowance" },
  { key: "tollEstimate", label: "Toll & Parking (est.)" },
  { key: "gst", label: "GST (5%)" },
  { key: "discount", label: "Discount", sign: "-" },
];

export function FareBreakdown({ fare }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-sm font-bold text-secondary-900">Fare Breakup</h3>
      <dl className="mt-3 flex flex-col gap-2 text-sm">
        {ROWS.map((row) => {
          const value = fare[row.key];
          if (!value) return null;
          return (
            <div key={row.key} className="flex items-center justify-between">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className={row.sign ? "text-success" : "text-secondary-900"}>
                {row.sign ?? ""}
                {formatCurrency(value)}
              </dd>
            </div>
          );
        })}
      </dl>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <dt className="text-base font-bold text-secondary-900">Total Fare</dt>
        <dd className="text-xl font-extrabold text-secondary-900">
          {formatCurrency(fare.total)}
        </dd>
      </div>
      <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Estimated fare for demonstration. Actual fare may vary based on
        real-time distance, tolls and traffic.
      </p>
    </div>
  );
}
