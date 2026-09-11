import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";
import { getRouteBySlug, getRoutes } from "@/services/route-service";
import { formatCurrency } from "@/lib/utils";

export async function generateStaticParams() {
  const routes = await getRoutes();
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const route = await getRouteBySlug(slug);
  if (!route) {
    return { title: "Route Not Found" };
  }

  return {
    title: `${route.origin} to ${route.destination} Cab`,
    description: route.overview,
    alternates: { canonical: `/routes/${route.slug}` },
  };
}

export default async function RouteDetailPage({ params }) {
  const { slug } = await params;
  const route = await getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  return (
    <PageContainer className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
        {route.origin} to {route.destination} Cab
      </h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{route.overview}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">Distance</p>
          <p className="mt-1 text-lg font-bold text-secondary-900">
            {route.distanceKm} km
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">Duration</p>
          <p className="mt-1 text-lg font-bold text-secondary-900">
            {route.durationLabel}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">Starting Fare</p>
          <p className="mt-1 text-lg font-bold text-secondary-900">
            {formatCurrency(route.startingFare)}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-secondary-900">
            Pickup Points
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-secondary-800">
            {route.pickupPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-secondary-900">
            Destination Highlights
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-secondary-800">
            {route.destinationHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-secondary-900">
            Travel Tips
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-secondary-800">
            {route.travelTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/book">Book This Route</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/routes">All Routes</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
