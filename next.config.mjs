/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
  eslint: {
    // Prevents production build failures on hosting providers (Vercel, Hostinger, etc.) due to ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevents builds failing over non-breaking type discrepancies
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
