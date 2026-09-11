import { siteConfig } from "@/config/site";
import { routes } from "@/data/routes";
import { packages } from "@/data/packages";
import { blogs } from "@/data/blogs";

const STATIC_ROUTES = [
  "/",
  "/book",
  "/services",
  "/services/one-way-cab",
  "/services/round-trip-cab",
  "/services/local-cab",
  "/services/airport-transfer",
  "/services/outstation-cab",
  "/services/shared-cab",
  "/routes",
  "/packages",
  "/offers",
  "/fleet",
  "/about",
  "/contact",
  "/faq",
  "/blog",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cancellation-policy",
  "/refund-policy",
];

export default function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const routeEntries = routes.map((route) => ({
    url: `${siteConfig.url}/routes/${route.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const packageEntries = packages.map((pkg) => ({
    url: `${siteConfig.url}/packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogEntries = blogs.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...routeEntries, ...packageEntries, ...blogEntries];
}
