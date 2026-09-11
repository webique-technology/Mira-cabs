"use client";

import { useState } from "react";
import { Check, Copy, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function OfferCard({ offer }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(offer.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-primary-300 bg-gradient-to-br from-primary-50 to-white p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary-900">
          <Tag className="h-4 w-4" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-primary-700">
          {offer.discountLabel}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-secondary-900">
        {offer.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{offer.description}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        Valid till {formatDate(offer.validTill)}
      </p>
      <details className="mt-2 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-medium text-secondary-700">
          Terms &amp; conditions
        </summary>
        <ul className="mt-1.5 list-disc space-y-1 pl-4">
          {offer.terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </details>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-11 flex-1 items-center justify-between rounded-xl border border-dashed border-secondary-300 bg-white px-3 text-sm font-bold tracking-wide text-secondary-900"
        >
          {offer.couponCode}
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <Button asChild size="sm">
          <Link href="/book">Apply</Link>
        </Button>
      </div>
    </div>
  );
}
