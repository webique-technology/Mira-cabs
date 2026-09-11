import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getBlogPosts } from "@/services/blog-service";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description:
    "Travel guides, fare explainers and booking tips from Mira Cabs.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Blog"
        title="Travel tips and route insights"
        description="Short practical reads to help you plan better road journeys."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
            <div className="relative h-44 w-full bg-muted">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                {post.category}
              </p>
              <h2 className="mt-2 text-lg font-bold text-secondary-900">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {formatDate(post.publishedAt)} • {post.readingTimeMinutes} min
                read
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800"
              >
                Read Article <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
