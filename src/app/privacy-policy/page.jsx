import { PageContainer } from "@/components/layout/PageContainer";

export const metadata = {
  title: "Privacy Policy",
  description: "How Mira collects and uses customer data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Mira collects only the data required to fulfill bookings, share trip
        updates and provide support. We do not sell personal data to third
        parties.
      </p>
    </PageContainer>
  );
}
