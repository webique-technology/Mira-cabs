import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHeader } from "@/components/common/PageHeader";

export const metadata = {
  title: "About Us",
  description: "Learn about Mira Cabs and our service standards.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Learn about Mira Cabs and our service standards."
      />
      <PageContainer className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="About Mira"
          title="Reliable road travel with transparent pricing"
          description="Mira Cabs helps travelers book one-way, round-trip, local and airport rides with clear fares and verified drivers."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <h2 className="text-base font-semibold text-secondary-900">
              Verified Drivers
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Background-checked drivers and trip monitoring for safer travel.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <h2 className="text-base font-semibold text-secondary-900">
              Transparent Fares
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              See base fare, allowances and estimates before confirming your
              ride.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <h2 className="text-base font-semibold text-secondary-900">
              24/7 Support
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Dedicated support for booking assistance and on-trip help.
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
