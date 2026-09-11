import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { StickyMobileCTA } from "@/components/common/StickyMobileCTA";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Reliable One-Way, Round-Trip & Airport Cabs`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "cab booking",
    "outstation cab",
    "airport taxi",
    "Nashik cab service",
    "Mumbai Pune cab",
    "one way cab",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Book Your Journey. We'll Handle the Road.`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1226",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/brand/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.supportNumber,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "mr"],
  },
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.twitter,
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TaxiService"],
  name: siteConfig.name,
  image: `${siteConfig.url}/images/brand/hero-cover.jpg`,
  telephone: siteConfig.supportNumber,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: ["Nashik", "Mumbai", "Pune", "Shirdi", "Aurangabad"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.stats.averageRating,
    reviewCount: 6000,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${jakarta.variable}`}>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col font-sans"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />

        <Header />
        <main id="main-content" className="flex-1 pb-10 md:pb-0">
          {children}
          <StickyMobileCTA />
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
