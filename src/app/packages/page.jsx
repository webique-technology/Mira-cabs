import { SectionHeading } from "@/components/common/SectionHeading";
import { PageContainer } from "@/components/layout/PageContainer";
import { PackageCard } from "@/components/packages/PackageCard";
import { getPackages } from "@/services/package-service";

export const metadata = {
  title: "Tour Packages",
  description:
    "Discover curated pilgrimage and leisure tour packages with fixed-fare cab plans.",
  alternates: { canonical: "/packages" },
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Tour Packages"
        title="Curated trips for weekends, pilgrimages and getaways"
        description="Choose a package and view day-wise itinerary before booking."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </PageContainer>
  );
}
