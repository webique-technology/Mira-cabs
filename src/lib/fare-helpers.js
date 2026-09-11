const LOCAL_PACKAGE_KM = {
  "4hr-40km": 40,
  "8hr-80km": 80,
  "12hr-120km": 120,
};

/**
 * Resolves an estimated one-way distance for a given search using known
 * static routes where possible, falling back to sane category defaults.
 * Mirrors what a real distance-matrix API would return once integrated.
 */
export function resolveDistanceKm(search, routes) {
  if (search.tripType === "local") {
    return search.rentalPackage
      ? (LOCAL_PACKAGE_KM[search.rentalPackage] ?? 40)
      : 40;
  }
  if (search.tripType === "airport") {
    return 35;
  }
  if (search.destination) {
    const match = routes.find(
      (route) =>
        route.origin.toLowerCase() === search.pickup.toLowerCase() &&
        route.destination.toLowerCase() === search.destination?.toLowerCase(),
    );
    if (match) return match.distanceKm;
  }
  return 130;
}

/** Number of billable days for driver allowance purposes. */
export function resolveDays(search) {
  if (search.tripType === "round-trip" && search.returnDate) {
    const start = new Date(search.pickupDate).getTime();
    const end = new Date(search.returnDate).getTime();
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + 1);
  }
  return 1;
}

/** Parses a human-readable offer discountLabel (e.g. "10% off, up to ₹500") into a rupee amount. */
export function computeOfferDiscount(offer, amount) {
  const percentMatch = offer.discountLabel.match(/(\d+)%/);
  const flatMatch = offer.discountLabel.match(/₹(\d+)/);

  if (percentMatch) {
    const percent = Number(percentMatch[1]);
    let discount = Math.round((amount * percent) / 100);
    const capMatch = offer.discountLabel.match(/up to ₹(\d+)/i);
    if (capMatch) discount = Math.min(discount, Number(capMatch[1]));
    return discount;
  }
  if (flatMatch) return Number(flatMatch[1]);
  return 0;
}
