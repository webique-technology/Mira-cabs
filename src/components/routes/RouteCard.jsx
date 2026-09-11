import Link from "next/link";
import { ArrowRight, Clock, Route as RouteIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function RouteCard({ route }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-bold text-secondary-900">
            <span>{route.origin}</span>
            <span className="relative flex-1 overflow-hidden">
              <svg
                viewBox="0 0 100 8"
                className="w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="2"
                  y1="4"
                  x2="98"
                  y2="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 5"
                  className="origin-left scale-x-0 text-primary-400 transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
              </svg>
            </span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary-500" />
            <span>{route.destination}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <RouteIcon className="h-3.5 w-3.5 text-primary-500" /> {route.distanceKm} km
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-primary-500" /> {route.durationLabel}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {route.availableCategories.slice(0, 3).map((category) => (
          <Badge key={category} variant="trinary">
            {category}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Starting at</p>
          <p className="text-lg font-bold text-secondary-900">
            {formatCurrency(route.startingFare)}
          </p>
        </div>
        <div className="flex">
          <Button asChild variant="outline" size="sm">
            <Link href={`/routes/${route.slug}`}>View Route</Link>
          </Button>
          {/* <Button asChild size="sm">
            <Link href="/book">Book Now</Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
