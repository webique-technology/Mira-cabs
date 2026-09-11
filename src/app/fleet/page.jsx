import { Suspense } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FleetClient } from "@/components/fleet/FleetClient";
import { PageContainer } from "@/components/layout/PageContainer";
import { getVehicles } from "@/services/vehicle-service";

export const metadata = {
  title: "Fleet",
  description:
    "Explore Mira vehicle categories, seating capacity and starting fares.",
  alternates: { canonical: "/fleet" },
};

export default async function FleetPage() {
  const vehicles = await getVehicles(undefined, "recommended");

  return (
    <PageContainer className="py-12 sm:py-16">
      {/* Centered Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          title="Vehicles for every trip size"
          description="From hatchbacks to tempo travellers, compare categories at a glance."
          align="center"
        />
      </div>

      {/* Tab Filter & Responsive Fleet Cards */}
      <Suspense
        fallback={
          <div className="py-12 text-center text-sm text-muted-foreground">
            Loading fleet...
          </div>
        }
      >
        <FleetClient initialVehicles={vehicles} />
      </Suspense>
    </PageContainer>
  );
}
