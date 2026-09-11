import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { ServiceShowcase } from "@/components/common/ServiceShowcase";
import { serviceItems } from "@/data/services-data";

export const metadata = {
  title: "Cab Services",
  description:
    "Explore one-way, round-trip, local, airport, outstation and shared ride services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  // Highlight the first two services with showcase views on the index page
  const featuredShowcases = serviceItems.slice(0, 2);

  return (
    <div className="space-y-8 pb-16">
      <PageContainer className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Services"
          title="Choose the right cab service for your journey"
          description="Pick a service type to view details, then book in minutes."
        />

        {/* Service Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-card"
            >
              <h2 className="text-lg font-bold text-secondary-900">
                {service.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {service.shortDescription}
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 w-full rounded-xl"
              >
                <Link href={`/services/${service.slug}`}>
                  View Details <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </PageContainer>

      {/* Alternating Showcases for Featured Services */}
      <div className="border-t border-border/60 bg-muted/20">
        {featuredShowcases.map((service, index) => (
          <ServiceShowcase
            key={service.slug}
            title={service.showcase.title}
            description={service.showcase.description}
            list={service.showcase.list}
            images={service.showcase.images}
            reverse={index % 2 !== 0}
            className="border-b border-border/40 last:border-b-0"
          />
        ))}
      </div>
    </div>
  );
}
