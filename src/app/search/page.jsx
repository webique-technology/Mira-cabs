import { PageContainer } from "@/components/layout/PageContainer";
import { VehicleResults } from "@/components/vehicles/VehicleResults";

export const metadata = {
  title: "Available Cabs",
  description:
    "Compare available cabs, fares and vehicle features for your selected trip.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">
        Available Cabs
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Compare vehicles and pick the one that fits your trip.
      </p>
      <div className="mt-6">
        <VehicleResults showFilters />
      </div>
    </PageContainer>
  );
}
