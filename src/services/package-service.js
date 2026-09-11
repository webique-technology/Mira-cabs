import { packages as packageData } from "@/data/packages";
import { mockDelay } from "@/services/mock-delay";

/** TODO(API migration): swap for GET /api/packages */
export async function getPackages() {
  await mockDelay();
  return packageData;
}

export async function getPackageBySlug(slug) {
  await mockDelay(300);
  return packageData.find((pkg) => pkg.slug === slug);
}
