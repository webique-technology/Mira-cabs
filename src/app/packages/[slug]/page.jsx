import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";
import { BookPackageButton } from "@/components/packages/BookPackageButton";
import { getPackageBySlug, getPackages } from "@/services/package-service";
import { formatCurrency } from "@/lib/utils";

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) {
    return { title: "Package Not Found" };
  }

  return {
    title: pkg.title,
    description: pkg.highlights.join(". "),
    alternates: { canonical: `/packages/${pkg.slug}` },
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Tour Package
        </span>
        <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
          {pkg.title}
        </h1>
        <p className="text-sm font-medium text-muted-foreground">
          {pkg.durationDays}D / {pkg.durationNights}N • Starting from{" "}
          <strong className="text-foreground">{formatCurrency(pkg.startingPrice)}</strong>
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-secondary-900">
          Day-wise Itinerary
        </h2>
        <ol className="mt-3 space-y-3">
          {pkg.itinerary.map((day) => (
            <li
              key={`${pkg.id}-${day.day}`}
              className="rounded-xl border border-border p-4"
            >
              <p className="text-sm font-bold text-secondary-900">
                Day {day.day}: {day.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {day.description}
              </p>
              {day.overnightStay ? (
                <p className="mt-1 text-xs font-semibold text-primary">
                  Overnight: {day.overnightStay}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-secondary-900">
            Inclusions
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-secondary-800">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-secondary-900">
            Exclusions
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-secondary-800">
            {pkg.exclusions.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {/* Dynamic button that initializes the booking flow */}
        <BookPackageButton pkg={pkg} />
        <Button asChild variant="outline" size="lg" className="rounded-2xl">
          <Link href="/packages">All Packages</Link>
        </Button>
      </div>
    </PageContainer>
  );
}