import { z } from "zod";

export const passengerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  alternateMobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
  passengers: z.coerce.number().min(1).max(20).optional(),
  packageDate: z.string().optional(),
  packageTime: z.string().optional(),
  pickupAddress: z.string().optional(),
  specialInstructions: z
    .string()
    .max(500, "Special instructions are too long")
    .optional()
    .or(z.literal("")),
  paymentMethod: z.enum(
    ["cash", "upi", "card_credit", "card_debit", "netbanking", "wallet"],
    { required_error: "Please select a payment method" },
  ),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});