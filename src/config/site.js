/**
 * Central site configuration. Environment-driven where possible so the
 * 3D experience, brand contact numbers and canonical URL can change per
 * deployment without touching component code.
 */

function readThreeDMode() {
  const value = process.env.NEXT_PUBLIC_3D_MODE;
  if (
    value === "interactive-map" ||
    value === "scroll-journey" ||
    value === "disabled"
  ) {
    return value;
  }
  return "lightweight-hero";
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Mira Cabs",
  shortName: "Mira",
  tagline: "Book Your Journey. We'll Handle the Road.",
  description:
    "Mira Cabs offers reliable one-way, round-trip, local and airport cab bookings across Maharashtra with transparent pricing, verified drivers and 24/7 support.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  enable3D: process.env.NEXT_PUBLIC_ENABLE_3D !== "false",
  threeDMode: readThreeDMode(),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210",
  supportNumber: process.env.NEXT_PUBLIC_SUPPORT_NUMBER ?? "+911234567890",
  supportEmail: "support@Miracabs.example",
  social: {
    instagram: "https://instagram.com/Miracabs",
    facebook: "https://facebook.com/Miracabs",
    twitter: "https://twitter.com/Miracabs",
  },
  stats: {
    ridesCompleted: 480000,
    verifiedDrivers: 3200,
    citiesServed: 45,
    averageRating: 4.8,
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  // { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "One-Way Cab", href: "/services/one-way-cab" },
      { label: "Round-Trip Cab", href: "/services/round-trip-cab" },
      { label: "Local Cab Rental", href: "/services/local-cab" },
      { label: "Airport Transfer", href: "/services/airport-transfer" },
      { label: "Outstation Cab", href: "/services/outstation-cab" },
      { label: "Shared Cab", href: "/services/shared-cab" },
    ],
  },
  { label: "Tour Packages", href: "/packages" },
  { label: "Vehicles", href: "/fleet" },
  { label: "Routes", href: "/routes" },
  // { label: "Offers", href: "/offers" },
  // { label: "Blog", href: "/blog" },
  // { label: "Contact", href: "/contact" },
];
