import { vehicles as vehicleData, vehicleCategories } from "@/data/vehicles";
import { mockDelay } from "@/services/mock-delay";
import { getOrSet } from "@/lib/server-cache";

/**
 * TODO(API migration): replace body with `fetch(\`\${API_BASE}/vehicles\`)`.
 * Signature and return type are designed to stay identical once backed by
 * the Java Spring Boot service.
 */
export async function getVehicles(filters, sort = "recommended") {
  // Fetch raw dataset from cache to avoid repeated mockDelay on SSR
  const raw = await getOrSet("vehicles:raw", 30_000, async () => {
    await mockDelay();
    return vehicleData;
  });
  let results = [...raw];

  if (filters?.categories?.length) {
    results = results.filter((vehicle) =>
      filters.categories.includes(vehicle.category),
    );
  }
  if (filters?.minSeats) {
    results = results.filter((vehicle) => vehicle.seats >= filters.minSeats);
  }
  if (filters?.maxPrice) {
    results = results.filter(
      (vehicle) => vehicle.finalFare <= filters.maxPrice,
    );
  }
  if (filters?.acOnly) {
    results = results.filter((vehicle) => vehicle.ac);
  }
  if (filters?.instantConfirmationOnly) {
    results = results.filter((vehicle) => vehicle.instantConfirmation);
  }

  switch (sort) {
    case "price-low":
      results.sort((a, b) => a.finalFare - b.finalFare);
      break;
    case "rating-high":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "capacity-high":
      results.sort((a, b) => b.seats - a.seats);
      break;
    default:
      // "Recommended": favor higher-rated vehicles, using price as a tiebreaker.
      results.sort((a, b) => b.rating - a.rating || a.finalFare - b.finalFare);
  }

  return results;
}

export async function getVehicleById(id) {
  const raw = await getOrSet("vehicles:raw", 30_000, async () => {
    await mockDelay(250);
    return vehicleData;
  });
  return raw.find((vehicle) => vehicle.id === id);
}

export async function getVehicleCategories() {
  return getOrSet("vehicles:categories", 60_000, async () => {
    await mockDelay(150);
    return vehicleCategories;
  });
}

/**
 * Mock, frontend-only fare estimator. Marked clearly as an estimate per the
 * product requirement; will be replaced by a server-computed fare once the
 * Java pricing service is available.
 */
export function calculateFare({
  vehicle,
  distanceKm,
  days = 1,
  discountOverride,
}) {
  const extraKm = Math.max(0, distanceKm - vehicle.includedKm);
  const distanceCharge = extraKm * vehicle.extraKmRate;
  const driverAllowance = vehicle.driverAllowance * days;
  const tollEstimate = Math.round(distanceKm * 1.1);
  const parkingFee = 0;
  const discount = discountOverride ?? vehicle.discount;

  const subtotal =
    vehicle.baseFare +
    distanceCharge +
    driverAllowance +
    tollEstimate +
    parkingFee -
    discount;
  const gst = Math.round(subtotal * 0.05);
  const total = Math.round(subtotal + gst);

  return {
    baseFare: vehicle.baseFare,
    distanceCharge,
    driverAllowance,
    tollEstimate,
    parkingFee,
    discount,
    gst,
    total,
    isEstimate: true,
  };
}
