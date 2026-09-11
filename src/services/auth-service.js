import { mockUser } from "@/data/users";
import { mockDelay } from "@/services/mock-delay";

/** TODO(API migration): swap for POST /api/auth/login */
export async function loginWithPassword(credentials) {
  await mockDelay(600);
  if (!credentials.email || credentials.password.length < 4) {
    throw new Error("Invalid email or password");
  }
  return mockUser;
}

/** TODO(API migration): swap for POST /api/auth/otp/verify */
export async function verifyOtp(payload) {
  await mockDelay(600);
  if (payload.otp !== "1234") {
    throw new Error("Incorrect OTP. Please try again.");
  }
  return mockUser;
}

/** TODO(API migration): swap for POST /api/auth/otp/request */
export async function requestOtp(mobile) {
  await mockDelay(500);
  if (mobile.length < 10) {
    throw new Error("Enter a valid 10-digit mobile number");
  }
  return { sent: true };
}

/** TODO(API migration): swap for POST /api/auth/register */
export async function registerUser(payload) {
  await mockDelay(700);
  return {
    ...mockUser,
    fullName: payload.fullName,
    email: payload.email,
    mobile: payload.mobile,
  };
}
