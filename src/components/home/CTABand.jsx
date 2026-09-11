// import Link from "next/link";
// import { PageContainer } from "@/components/layout/PageContainer";
// import { Button } from "@/components/ui/button";

// export function CTABand() {
//   return (
//     <section className="pb-8 sm:pb-20">
//       <PageContainer>
//         <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-700 px-6 py-14 text-center shadow-premium sm:px-12">
//           <div
//             className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,166,35,0.3),transparent_28%)]"
//             aria-hidden="true"
//           />
//           <div
//             className="absolute -right-10 top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"
//             aria-hidden="true"
//           />
//           <div
//             className="absolute -left-10 bottom-4 h-28 w-28 rounded-full bg-primary/20 blur-2xl"
//             aria-hidden="true"
//           />
//           <h2 className="relative text-balance text-3xl font-extrabold text-white sm:text-4xl">
//             Ready for your next ride?
//           </h2>
//           <p className="relative mx-auto mt-3 max-w-xl text-balance text-blue-50/80">
//             Get transparent pricing, a verified driver, and a stress-free
//             booking experience across Maharashtra.
//           </p>
//           <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
//             <Button
//               asChild
//               size="lg"
//               className="bg-primary text-primary-foreground hover:bg-primary-400"
//             >
//               <Link href="/book">Book a Cab Now</Link>
//             </Button>
//             <Button
//               asChild
//               size="lg"
//               variant="outline"
//               className="border-white/30 bg-white/5 text-white hover:bg-white/10"
//             >
//               <Link href="/contact">Talk to Support</Link>
//             </Button>
//           </div>
//         </div>
//       </PageContainer>
//     </section>
//   );
// }

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { siteConfig } from "@/config/site";

const POPULAR_ROUTES = ["Nashik ⇄ Mumbai", "Pune", "Shirdi", "Mahabaleshwar"];

export function CTABand() {
  const supportPhone = siteConfig?.supportNumber || "1800 554 422";
  const cleanPhone = supportPhone.replace(/\D/g, "");

  return (
    <section className="pb-12 sm:pb-20">
      <PageContainer>
        {/* Split Card Container with Radial Ambient Glow */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-white shadow-2xl [background:radial-gradient(circle_at_90%_10%,_rgba(217,119,6,0.28)_0%,_rgba(15,23,42,0)_70%),radial-gradient(circle_at_10%_90%,_rgba(30,41,59,0.6)_0%,_rgba(15,23,42,1)_100%)]">
          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-16">
            {/* Left Column: Value Proposition */}
            <div className="flex flex-col justify-center space-y-6 lg:col-span-7">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-700/70 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-amber-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Zero Surge Pricing Guarantee</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Ready for your next ride?
              </h2>

              {/* Description */}
              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Get transparent pricing, a verified driver, and a stress-free
                booking experience across Maharashtra.
              </p>

              {/* Action Buttons & Micro Proofs */}
              <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition duration-200 hover:bg-amber-400 sm:w-auto"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center gap-2 text-xs text-white-400">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>No hidden tolls • Fixed round-trip rates</span>
                </div>
              </div>

              {/* Location Coverage Tags */}
              <div className="flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-4 text-xs text-slate-400">
                {POPULAR_ROUTES.map((route) => (
                  <span
                    key={route}
                    className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-300"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Fast Track Concierge Card */}
            <div className="w-full lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl backdrop-blur-sm sm:p-7">
                {/* Concierge Header */}
                <div className="flex items-center justify-between border-b border-slate-700 pb-5">
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Fast Track Concierge
                    </span>
                    <h3 className="mt-0.5 text-lg font-bold text-white">
                      Instant Support & Dispatch
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-medium text-emerald-400">
                      Online Now
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="my-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl flex items-center border border-slate-700/50 bg-slate-900/60 p-3">
                    {/* <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> */}
                    <p className="block text-[11px] text-slate-400">
                      Police-verified background &amp; drug-tested drivers
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-3">
                    <span className="block text-[11px] text-slate-400">
                      Chauffeur Status
                    </span>
                    <p className="mt-0.5 text-base font-bold text-amber-400">
                      100% Verified
                    </p>
                  </div>
                </div>

                {/* Contact Action Buttons */}
                <div className="space-y-3">
                  {/* Phone Hotline */}
                  <a
                    href={`tel:${cleanPhone}`}
                    className="group flex w-full items-center justify-between rounded-xl border border-primary-700 bg-slate-900 p-3.5 transition duration-150 hover:bg-slate-950"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-slate-900">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium text-amber-400">
                          24/7 Hotline Call Desk
                        </p>
                        <p className="text-sm font-bold tracking-wide text-white">
                          {supportPhone}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 transition-all group-hover:translate-x-0.5 group-hover:text-primary">
                      Call →
                    </span>
                  </a>

                  {/* WhatsApp Support */}
                  <a
                    href={`https://wa.me/91${cleanPhone}?text=Hello%2C%20I%20need%20a%20cab%20estimate`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center justify-between rounded-xl border border-emerald-600/40 bg-emerald-950/40 p-3.5 transition duration-150 hover:bg-emerald-900/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-slate-950">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium text-emerald-300">
                          Instant Route Estimate
                        </p>
                        <p className="text-sm font-bold text-white">
                          Chat on WhatsApp
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-300 transition-all group-hover:translate-x-0.5 group-hover:text-white">
                      Start →
                    </span>
                  </a>
                </div>

                {/* Driver Guarantee Stamp */}
                {/* <div className="mt-4 flex items-center justify-center gap-1.5 border-t border-slate-700/60 pt-3.5 text-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <p className="text-[11px] font-medium text-slate-400">
                    Police-verified background &amp; drug-tested drivers
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
