import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RouteCard } from "@/components/routes/RouteCard";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { getRoutes } from "@/services/route-service";

export async function PopularRoutesSection() {
  const routes = await getRoutes();

  return (
    <section className="bg-primary/10 py-16 sm:py-24">
      <PageContainer>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Popular Routes"
            title="Top Routes Travellers "
            highlightTitle={"Book the Most"}
          />
          <Button asChild variant="">
            <Link href="/routes">View All Routes</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.slice(0, 6).map((route, i) => (
            <Reveal key={route.id} delay={i * 0.05}>
              <RouteCard route={route} />
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
