import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

export function RoutesSectionFallback() {
  return (
    <section className="py-16">
      <PageContainer>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </div>
      </PageContainer>
    </section>
  );
}

export function TourPackagesSectionFallback() {
  return (
    <section className="py-16">
      <PageContainer>
        <Skeleton className="h-44 w-full" />
      </PageContainer>
    </section>
  );
}

export function FleetSectionFallback() {
  return (
    <section className="py-16">
      <PageContainer>
        <Skeleton className="h-44 w-full" />
      </PageContainer>
    </section>
  );
}

export function OffersSectionFallback() {
  return (
    <section className="py-16">
      <PageContainer>
        <Skeleton className="h-44 w-full" />
      </PageContainer>
    </section>
  );
}

export function TestimonialsSectionFallback() {
  return (
    <section className="py-16">
      <PageContainer>
        <Skeleton className="h-44 w-full" />
      </PageContainer>
    </section>
  );
}

export function FAQSectionFallback() {
  return (
    <section className="py-16">
      <PageContainer>
        <Skeleton className="h-44 w-full" />
      </PageContainer>
    </section>
  );
}
