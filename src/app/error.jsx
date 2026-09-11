"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // In production this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <PageContainer className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-destructive">
        Something went wrong
      </p>
      <h1 className="mt-3 text-3xl font-bold text-secondary-900 sm:text-4xl">
        We hit a bump in the road
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
