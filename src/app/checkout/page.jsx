import { PageContainer } from "@/components/layout/PageContainer";
import { CheckoutClient } from "@/app/checkout/checkout-client";

export const metadata = {
  title: "Checkout",
  description:
    "Review your trip, add passenger details and confirm your cab booking.",
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Confirm your trip and passenger details to complete your booking.
      </p>
      <div className="mt-6">
        <CheckoutClient />
      </div>
    </PageContainer>
  );
}
