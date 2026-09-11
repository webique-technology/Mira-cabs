import { z } from "zod";

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

const notPastDate = (message) =>
  z
    .string()
    .min(1, message)
    .refine((value) => value >= todayIso(), {
      message: "Date cannot be in the past",
    });

export const oneWaySchema = z
  .object({
    pickup: z.string().min(2, "Enter a pickup city"),
    destination: z.string().min(2, "Enter a destination city"),
    pickupDate: notPastDate("Select a pickup date"),
    pickupTime: z.string().min(1, "Select a pickup time"),
    passengers: z.number().min(1).max(12),
  })
  .refine(
    (data) => data.pickup.toLowerCase() !== data.destination.toLowerCase(),
    {
      message: "Pickup and destination cannot be the same",
      path: ["destination"],
    },
  );

export const roundTripSchema = z
  .object({
    pickup: z.string().min(2, "Enter a pickup city"),
    destination: z.string().min(2, "Enter a destination city"),
    pickupDate: notPastDate("Select a departure date"),
    returnDate: notPastDate("Select a return date"),
    pickupTime: z.string().min(1, "Select a pickup time"),
    passengers: z.number().min(1).max(12),
  })
  .refine(
    (data) => data.pickup.toLowerCase() !== data.destination.toLowerCase(),
    {
      message: "Pickup and destination cannot be the same",
      path: ["destination"],
    },
  )
  .refine((data) => data.returnDate >= data.pickupDate, {
    message: "Return date must be on or after the departure date",
    path: ["returnDate"],
  });

export const localRentalSchema = z.object({
  pickup: z.string().min(2, "Enter a city"),
  pickupDate: notPastDate("Select a date"),
  pickupTime: z.string().min(1, "Select a time"),
  rentalPackage: z.string().min(1, "Select a rental package"),
  passengers: z.number().min(1).max(12),
});

export const airportSchema = z.object({
  airportType: z.enum(["pickup", "drop"]),
  airport: z.string().min(2, "Select an airport"),
  pickup: z.string().min(2, "Enter a city"),
  terminal: z.string().min(1, "Select a terminal"),
  pickupDate: notPastDate("Select a date"),
  pickupTime: z.string().min(1, "Select a time"),
  flightNumber: z.string().min(2, "Enter your flight number"),
  passengers: z.number().min(1).max(12),
});

export const sharedRideSchema = z
  .object({
    pickup: z.string().min(2, "Enter a pickup location"),
    destination: z.string().min(2, "Enter a destination"),
    pickupDate: notPastDate("Select a date"),
    pickupTime: z.string().min(1, "Select a time"),
    passengers: z.number().min(1).max(6),
  })
  .refine(
    (data) => data.pickup.toLowerCase() !== data.destination.toLowerCase(),
    {
      message: "Pickup and destination cannot be the same",
      path: ["destination"],
    },
  );

export const rentalPackages = [
  { value: "4hr-40km", label: "4 hours / 40 km" },
  { value: "8hr-80km", label: "8 hours / 80 km" },
  { value: "12hr-120km", label: "12 hours / 120 km" },
];
