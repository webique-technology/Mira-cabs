import { reviews as reviewData } from "@/data/reviews";
import { mockDelay } from "@/services/mock-delay";

/** TODO(API migration): swap for GET /api/reviews */
export async function getReviews() {
  await mockDelay(300);
  return reviewData;
}
