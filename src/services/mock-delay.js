/**
 * Simulates network latency for the mock service layer so loading/skeleton
 * states behave the same way they will once these are swapped for real
 * Java Spring Boot REST calls.
 */
export function mockDelay(ms = 450) {
  // Keep the app fast by default. Enable mock latency only when explicitly
  // requested through env vars while testing loading states.
  const shouldDelay = process.env.NEXT_PUBLIC_ENABLE_MOCK_DELAY === "true";
  if (!shouldDelay) {
    return Promise.resolve();
  }

  const envDelay = Number(process.env.NEXT_PUBLIC_MOCK_DELAY_MS);
  const resolvedDelay =
    Number.isFinite(envDelay) && envDelay >= 0 ? envDelay : ms;

  return new Promise((resolve) => setTimeout(resolve, resolvedDelay));
}
