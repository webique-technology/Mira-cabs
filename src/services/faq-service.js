import { faqs as faqData } from "@/data/faqs";
import { mockDelay } from "@/services/mock-delay";

/** TODO(API migration): swap for GET /api/faqs */
export async function getFaqs() {
  await mockDelay(200);
  return faqData;
}

export async function getFaqsByCategory(category) {
  await mockDelay(200);
  return faqData.filter((faq) => faq.category === category);
}
