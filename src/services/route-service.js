import { routes as routeData } from "@/data/routes";
import { locations as locationData } from "@/data/locations";
import { airports as airportData } from "@/data/airports";
import { mockDelay } from "@/services/mock-delay";
import { getOrSet } from "@/lib/server-cache";

/** TODO(API migration): swap for GET /api/routes */
export async function getRoutes() {
  return getOrSet("routes:list", 30_000, async () => {
    await mockDelay();
    return routeData;
  });
}

export async function getRouteBySlug(slug) {
  // Reuse the cached list so we don't re-run mockDelay per page during SSR
  const routes = await getRoutes();
  return routes.find((route) => route.slug === slug);
}

export async function searchLocations(query) {
  await mockDelay(150);
  const normalized = query.trim().toLowerCase();
  if (!normalized) return locationData.filter((l) => l.popular).slice(0, 8);
  return locationData
    .filter((location) => location.name.toLowerCase().includes(normalized))
    .slice(0, 8);
}

export async function getAirports() {
  return getOrSet("routes:airports", 60_000, async () => {
    await mockDelay(150);
    return airportData;
  });
}
