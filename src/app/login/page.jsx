import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Login",
  description: "Sign in to view bookings, saved details and ride updates.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Account"
        title="Login page is ready"
        description="Authentication APIs are currently mocked. Continue with booking or tracking your trip."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/book">Book a Cab</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/track-booking">Track Booking</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
