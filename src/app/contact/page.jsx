import Link from "next/link";
import {
  Building2,
  Fuel,
  HelpCircle,
  Mail,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContactFormClient } from "@/components/common/ContactFormClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact & Concierge Desk",
  description:
    "Get in touch with Mira Cabs 24/7 highway concierge for outstation bookings, airport transfers, corporate tie-ups, and active trip assistance.",
  alternates: { canonical: "/contact" },
};

const CONTACT_FAQS = [
  {
    id: "faq-1",
    question: "Need an immediate cab pickup?",
    answer:
      "For departures within the next 2 hours, please call our 24/7 priority line directly (+91 253 234-8800) rather than submitting the web form for instant dispatch.",
  },
  {
    id: "faq-2",
    question: "How do I modify an active reservation?",
    answer:
      "You can reschedule your pickup time or modify driver instructions up to 2 hours prior to journey start via our WhatsApp desk with zero amendment fees.",
  },
  {
    id: "faq-3",
    question: "Corporate fleet invoices & GST input credit?",
    answer:
      "Yes. Provide your company GSTIN during checkout or contact corporate@miracabs.com to receive automated GST-compliant tax invoices for monthly vendor billing.",
  },
  {
    id: "faq-4",
    question: "Are highway tolls and state taxes included?",
    answer:
      "All intercity and outstation quotes calculate standard fuel, highway tolls, and driver allowances upfront with zero surge pricing.",
  },
];

export default function ContactPage() {
  const helplinePhone = siteConfig?.supportNumber || "+91 (0253) 234-8800";
  const cleanPhone = helplinePhone.replace(/\D/g, "");
  const supportEmail = siteConfig?.supportEmail || "support@miracabs.com";

  return (
    <div className="w-full bg-background">
      {/* Top Hero Section */}
      <section className="relative w-full overflow-hidden bg-muted/40 py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <PageContainer className="relative flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-900">
              Get in Touch • 24/7 Intercity Concierge
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-secondary-900 sm:text-4xl md:text-5xl">
            We’re Here to Keep Your Journey Seamless
          </h1>
        </PageContainer>
      </section>

      {/* 50/50 Split Section: Left Contact Info / Right Form */}
      <section className="bg-primary/10 py-12 lg:py-16">
        <PageContainer>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* LEFT COLUMN: Channels & Hubs */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex flex-col gap-3">
                {/* 24/7 Helpline */}
                <a
                  href={`tel:${cleanPhone}`}
                  className="group flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 shadow-soft transition-all duration-200 hover:border-border hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-transform duration-200 group-hover:scale-105">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        24/7 Helpline &amp; Dispatch
                      </span>
                      <span className="text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                        Toll-Free →
                      </span>
                    </div>
                    <span className="mt-0.5 text-lg font-bold text-secondary-900 sm:text-xl">
                      {helplinePhone}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Direct connect to intercity operations desk
                    </span>
                  </div>
                </a>

                {/* WhatsApp Concierge */}
                <a
                  href={`https://wa.me/91${cleanPhone}?text=Hello%2C%20I%20need%20a%20cab%20estimate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 shadow-soft transition-all duration-200 hover:border-border hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform duration-200 group-hover:scale-105">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Instant WhatsApp Desk
                      </span>
                      <span className="text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                        Chat Now →
                      </span>
                    </div>
                    <span className="mt-0.5 text-lg font-bold text-secondary-900 sm:text-xl">
                      +91 91123 45678
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Avg. response under 2 minutes for quotes &amp; driver info
                    </span>
                  </div>
                </a>

                {/* Email Support */}
                <div className="flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Email Concierge
                    </span>
                    <a
                      href={`mailto:${supportEmail}`}
                      className="mt-0.5 text-sm font-semibold text-secondary-900 transition-colors hover:text-primary"
                    >
                      {supportEmail}
                    </a>
                    <a
                      href="mailto:corporate@miracabs.com"
                      className="mt-0.5 text-xs text-muted-foreground transition-colors hover:text-secondary-900"
                    >
                      corporate@miracabs.com (Invoicing &amp; B2B)
                    </a>
                  </div>
                </div>

                {/* Central Headquarters */}
                <div className="flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-secondary-900">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Central Operations HQ
                    </span>
                    <span className="mt-0.5 text-sm font-bold text-secondary-900">
                      Mira Cabs Private Limited
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Office No. 402, Business Bay, Gangapur Road, Nashik,
                      Maharashtra 422005
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Form */}
            <div className="lg:col-span-7">
              <ContactFormClient />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Corridor Map & Side-by-Side FAQ Section */}
      <section className="py-16">
        <PageContainer>
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
              {/* Left Side: SVG Maharashtra Geometry Map (7 Cols) */}
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft md:col-span-6">
                <div className="relative flex h-[100%] w-full items-center justify-center overflow-hidden rounded-xl bg-muted/30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.3893204063115!2d73.7832129!3d20.0341293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb961aa59b89%3A0x6ecc23f8742347e4!2sNashik%20Mumbai%20Pune%20Shirdi%20Airport%20Cabs!5e0!3m2!1sen!2sin!4v1788940595464!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              </div>

              {/* Right Side: Accordion FAQ (5 Cols) */}
              <div className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-soft md:col-span-6">
                <div className="mb-2 flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-bold text-secondary-900">
                      Quick Resolution FAQs
                    </h3>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                  >
                    <Link href="/faq">All FAQs →</Link>
                  </Button>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue="faq-1"
                  className="w-full"
                >
                  {CONTACT_FAQS.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left text-xs font-bold text-secondary-900 sm:text-sm hover:no-underline hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
