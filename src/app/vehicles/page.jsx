import { PageContainer } from "@/components/layout/PageContainer";
import { VehicleResults } from "@/components/vehicles/VehicleResults";

export const metadata = {
  title: "Select Your Vehicle",
  description:
    "Choose from Hatchback, Sedan, Premium Sedan, SUV, MUV and Tempo Traveller vehicles for your trip.",
  robots: { index: false, follow: true },
};

export default function VehiclesPage() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">
        Select Your Vehicle
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All vehicles available for your selected route.
      </p>
      <div className="mt-6">
        <VehicleResults showFilters={false} />
      </div>
    </PageContainer>
  );
}
