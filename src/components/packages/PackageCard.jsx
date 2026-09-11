import Image from "next/image";
import Link from "next/link";
import { CalendarRange, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/common/Rating";
import { formatCurrency } from "@/lib/utils";

export function PackageCard({ pkg }) {
  return (
    <div className="flex flex-col items-stretch overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-card">
      <div className="p-5 pb-0">
        {/* Inner bounding box with strict overflow-hidden and rounded corners */}
        <div className="relative h-[190px] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={pkg.image}
            alt={`${pkg.title} tour package`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-secondary-900 shadow-soft backdrop-blur-sm">
            {pkg.durationDays}D / {pkg.durationNights}N
          </div>
        </div>
      </div>
      <div className="flex flex-1 min-h-[237px] h-100 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-secondary-900">
            {pkg.title}
          </h3>
          <Rating value={pkg.rating} />
        </div>
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <MapPinned className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-2">{pkg.locations.join(", ")}</span>
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {pkg.highlights.slice(0, 2).map((highlight) => (
            <li
              key={highlight}
              className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-secondary-700"
            >
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold text-secondary-900">
              {formatCurrency(pkg.startingPrice)}
            </p>
          </div>
          <Button asChild size="sm">
            <Link href={`/packages/${pkg.slug}`}>
              <CalendarRange className="mr-1.5 h-3.5 w-3.5" /> View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
