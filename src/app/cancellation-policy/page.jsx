import { PageContainer } from "@/components/layout/PageContainer";

export const metadata = {
  title: "Cancellation Policy",
  description: "Cancellation and no-show rules for Mira bookings.",
  alternates: { canonical: "/cancellation-policy" },
};

export default function CancellationPolicyPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
        Cancellation Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Most bookings are eligible for free cancellation within the
        route-specific time window shown on vehicle selection. Charges may apply
        for late cancellations and no-shows.
      </p>
    </PageContainer>
  );
}
