import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getFaqs } from "@/services/faq-service";

export const metadata = {
  title: "FAQs",
  description:
    "Find quick answers on booking, pricing, cancellation and safety.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="FAQs"
        title="Frequently asked questions"
        description="Everything you need to know before and after booking."
      />

      <div className="mt-8 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="rounded-xl border border-border bg-card p-4 shadow-soft"
          >
            <summary className="cursor-pointer text-sm font-semibold text-secondary-900">
              {faq.question}
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </PageContainer>
  );
}
