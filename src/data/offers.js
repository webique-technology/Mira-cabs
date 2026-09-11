export const offers = [
  {
    id: "offer-first-ride",
    title: "First Ride Discount",
    description:
      "New to Mira? Get flat savings on your very first booking, any trip type.",
    couponCode: "FIRSTRIDE300",
    discountLabel: "Flat ₹300 off",
    validTill: "2026-12-31",
    terms: [
      "Valid for first-time users only",
      "Applicable on minimum booking of ₹1,500",
      "Cannot be combined with other offers",
    ],
    category: "new-user",
  },
  {
    id: "offer-one-way",
    title: "One-Way Offer",
    description:
      "Travelling one direction? Save extra on all one-way outstation bookings.",
    couponCode: "ONEWAY10",
    discountLabel: "10% off, up to ₹500",
    validTill: "2026-10-31",
    terms: [
      "Valid on one-way trips over 100 km",
      "Maximum discount ₹500",
      "Valid Monday to Thursday",
    ],
    category: "one-way",
  },
  {
    id: "offer-round-trip",
    title: "Round-Trip Offer",
    description:
      "Book your return journey together and unlock better per-day pricing.",
    couponCode: "ROUNDTRIP12",
    discountLabel: "12% off",
    validTill: "2026-11-30",
    terms: [
      "Valid on round trips of 2 days or more",
      "Applicable across all vehicle categories",
    ],
    category: "round-trip",
  },
  {
    id: "offer-airport",
    title: "Airport Transfer Discount",
    description:
      "Flat discount on all airport pickup and drop bookings across Mumbai, Pune and Nashik.",
    couponCode: "FLYEASY150",
    discountLabel: "Flat ₹150 off",
    validTill: "2026-12-31",
    terms: [
      "Valid on airport pickup and drop",
      "One use per customer per month",
    ],
    category: "airport",
  },
  {
    id: "offer-weekend",
    title: "Weekend Travel Offer",
    description:
      "Special weekend pricing on Nashik-Mumbai-Pune triangle routes.",
    couponCode: "WEEKEND8",
    discountLabel: "8% off",
    validTill: "2026-09-30",
    terms: [
      "Valid for Friday to Sunday pickups",
      "Applicable on Sedan and above",
    ],
    category: "seasonal",
  },
  {
    id: "offer-referral",
    title: "Referral Reward",
    description:
      "Refer a friend and both of you earn ride credit on their first completed trip.",
    couponCode: "REFER200",
    discountLabel: "₹200 ride credit",
    validTill: "2026-12-31",
    terms: [
      "Credited after referred friend completes their first ride",
      "Credits expire after 90 days",
    ],
    category: "referral",
  },
];
