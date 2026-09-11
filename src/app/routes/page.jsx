import { SectionHeading } from "@/components/common/SectionHeading";
import { PageContainer } from "@/components/layout/PageContainer";
import { RouteCard } from "@/components/routes/RouteCard";
import { getRoutes } from "@/services/route-service";

export const metadata = {
  title: "Popular Cab Routes",
  description: "Browse frequently booked intercity routes and starting fares.",
  alternates: { canonical: "/routes" },
};

export default async function RoutesPage() {
  const routes = await getRoutes();

  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Routes"
        title="Popular routes with transparent pricing"
        description="Compare travel time, distance and fare before you book."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </PageContainer>
  );
}
