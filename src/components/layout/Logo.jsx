import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ light = false, className }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 min-h-11", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-amber text-lg font-black text-secondary-900 shadow-soft">
        M
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          light ? "text-white" : "text-secondary-900",
        )}
      >
        {siteConfig.shortName}
        <span className={light ? "text-primary-300" : "text-primary-600"}>
          {" "}
          Cabs
        </span>
      </span>
    </Link>
  );
}
