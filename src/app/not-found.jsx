import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-primary-600">
        404 Error
      </p>
      <h1 className="mt-3 text-3xl font-bold text-secondary-900 sm:text-4xl">
        This page took a wrong turn
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back on route.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/book">Book a Cab</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
