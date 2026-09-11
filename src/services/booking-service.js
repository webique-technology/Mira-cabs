import { mockBookings } from "@/data/bookings";
import { offers as offerData } from "@/data/offers";
import { generateBookingId } from "@/lib/utils";
import { mockDelay } from "@/services/mock-delay";

const STORAGE_KEY = "Mira.bookings";

function readStoredBookings() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStoredBookings(bookings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

/** TODO(API migration): swap for GET /api/bookings */
export async function getBookings() {
  await mockDelay();
  return [...readStoredBookings(), ...mockBookings];
}

export async function getBookingById(id) {
  await mockDelay(300);
  return [...readStoredBookings(), ...mockBookings].find(
    (booking) => booking.id === id,
  );
}

/** TODO(API migration): swap for POST /api/bookings */
export async function createBooking(input) {
  await mockDelay(900);
  const booking = {
    id: generateBookingId(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
    ...input,
  };
  const existing = readStoredBookings();
  writeStoredBookings([booking, ...existing]);
  return booking;
}

export async function getOffers() {
  await mockDelay(200);
  return offerData;
}

export async function validateCoupon(code) {
  await mockDelay(400);
  return (
    offerData.find(
      (offer) => offer.couponCode.toLowerCase() === code.trim().toLowerCase(),
    ) ?? null
  );
}
