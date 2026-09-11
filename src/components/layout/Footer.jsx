import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "One-Way Cab", href: "/services/one-way-cab" },
      { label: "Round-Trip Cab", href: "/services/round-trip-cab" },
      { label: "Local Cab Rental", href: "/services/local-cab" },
      { label: "Airport Transfer", href: "/services/airport-transfer" },
      { label: "Outstation Cab", href: "/services/outstation-cab" },
      { label: "Shared Cab", href: "/services/shared-cab" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Popular Routes", href: "/routes" },
      { label: "Tour Packages", href: "/packages" },
      { label: "Our Fleet", href: "/fleet" },
      { label: "Offers", href: "/offers" },
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Track Booking", href: "/track-booking" },
      { label: "My Account", href: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary-950 text-secondary-100">
      <PageContainer className="py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-300">
                Stay in touch
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-white">
                Get updates & travel offers
              </h3>
            </div>
            <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <input
                aria-label="Email address"
                type="email"
                placeholder="Your email address"
                className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
              />

              <Button className="h-12 bg-primary text-primary-foreground hover:bg-primary-400">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo light />
            <p className="mt-4 max-w-md text-sm leading-7 text-secondary-300">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                aria-label="Mira on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                aria-label="Mira on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                aria-label="Mira on Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-400">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-200 hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 text-sm text-secondary-300 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary-400" />{" "}
            {siteConfig.supportNumber}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary-400" />{" "}
            {siteConfig.supportEmail}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary-400" /> Nashik, Maharashtra,
            India
          </div>
        </div>
        <p className="mt-8 text-xs text-secondary-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          Fares and availability shown are for demonstration purposes.
        </p>
      </PageContainer>
    </footer>
  );
}
