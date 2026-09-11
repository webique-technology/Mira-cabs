import {
  BadgeCheck,
  // CalendarCheck2,
  // Car,
  CreditCard,
  // MapPin,
  // ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import Image from "next/image";

const REASONS = [
  {
    icon: BadgeCheck,
    title: "Verified Drivers",
    description:
      "Every driver is document-verified and background-checked before onboarding.",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    description:
      "See the full fare breakup upfront — no hidden charges at drop-off.",
  },
  {
    icon: Timer,
    title: "24/7 Support",
    description:
      "Our support team is reachable around the clock for any trip, any time.",
  },
  {
    icon: Sparkles,
    title: "Clean & Sanitized Cars",
    description: "Every vehicle is inspected and sanitized before each trip.",
  },
  // {
  //   icon: CalendarCheck2,
  //   title: "On-Time Pickup",
  //   description:
  //     "Drivers arrive on schedule, with live status updates before pickup.",
  // },
  // {
  //   icon: Car,
  //   title: "Multiple Payment Options",
  //   description:
  //     "Pay via UPI, cards, net banking, wallets, or cash to the driver.",
  // },
  // {
  //   icon: MapPin,
  //   title: "GPS Trip Tracking",
  //   description:
  //     "Track your ongoing trip in real time from booking to drop-off.",
  // },
  // {
  //   icon: ShieldCheck,
  //   title: "Easy Cancellation",
  //   description: "Flexible, transparent cancellation windows on every booking.",
  // },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24">
      <PageContainer>
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why Mira"
              title="Built around a "
              highlightTitle={"safer, simpler ride"}
              align="left"
              className="mx-auto"
            />
            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-2 xl:grid-cols-2">
              {REASONS.map((reason, i) => (
                <Reveal key={reason.title} delay={i * 0.05}>
                  <div className="travel-card flex h-full flex-col items-start gap-4 p-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 shadow-soft">
                      <reason.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-900">
                        {reason.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Image
              src={"/images/why-choose-img.webp"}
              alt="Why Choose Us"
              width={551}
              height={551}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
