"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/** Sticky bottom booking CTA + call button, shown only on small screens. */
export function StickyMobileCTA({ label = "Book Cab", href = "/book" }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 p-3 backdrop-blur-md safe-bottom md:hidden">
      <a
        href={`tel:${siteConfig.supportNumber}`}
        aria-label="Call support"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-soft"
      >
        <Phone className="h-5 w-5" />
      </a>
      <Button asChild size="lg" className="flex-1">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}
