import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, count, size = "sm", className }) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <Star
        className={cn(iconSize, "fill-primary text-primary")}
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-secondary-900">
        {value.toFixed(1)}
      </span>
      {typeof count === "number" ? (
        <span className="text-xs text-muted-foreground">
          ({count.toLocaleString("en-IN")})
        </span>
      ) : null}
      <span className="sr-only">
        {value} out of 5 stars{count ? ` from ${count} reviews` : ""}
      </span>
    </div>
  );
}
