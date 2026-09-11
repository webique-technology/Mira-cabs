"use client";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export function FAQPreview({
  faqs,
  secClass = "bg-white",
  viewAllBtn = true,
  image = "/images/faq.webp",
}) {
  return (
    <section className={`py-16 sm:py-18 ${secClass}`}>
      <PageContainer className="">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
          <div className="hidden md:block">
            <Image
              src={image}
              alt="FAQ"
              width={481}
              height={381}
              className="object-cover rounded-xl aspect-[3/3.5]"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Have Questions?"
              title="Frequently asked "
              highlightTitle={"questions"}
              align="center"
              className="mx-auto"
            />
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {viewAllBtn && (
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
