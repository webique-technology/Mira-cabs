import { PageContainer } from "@/components/layout/PageContainer";

export const metadata = {
  title: "Refund Policy",
  description: "Refund processing timelines for eligible cancellations.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
        Refund Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        For eligible cancellations, refunds are initiated to the original
        payment method and generally complete within 5 to 7 business days.
      </p>
    </PageContainer>
  );
}
