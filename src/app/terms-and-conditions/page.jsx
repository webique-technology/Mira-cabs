import { PageContainer } from "@/components/layout/PageContainer";

export const metadata = {
  title: "Terms and Conditions",
  description: "Booking and service terms for Mira cabs.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
        Terms and Conditions
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Fares, driver allowances, toll estimates and cancellation windows are
        shown during booking. Continued use of the platform implies acceptance
        of the displayed booking terms.
      </p>
    </PageContainer>
  );
}
