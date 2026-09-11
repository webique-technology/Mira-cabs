import { notFound } from "next/navigation";
import { serviceItems } from "@/data/services-data";
import { getFaqs } from "@/services/faq-service";
import { ServiceDetailClient } from "@/components/common/ServiceDetailClient";

export function generateStaticParams() {
  return serviceItems.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceItems.find((item) => item.slug === slug);
  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} Service`,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = serviceItems.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  // Load global fallback FAQs if specific service FAQs are not set
  const fallbackFaqs = await getFaqs();

  return (
    <ServiceDetailClient
      service={service}
      initialFaqs={service.faqs || fallbackFaqs.slice(0, 5)}
    />
  );
}
