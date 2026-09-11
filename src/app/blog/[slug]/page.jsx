import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getRelatedBlogPosts,
} from "@/services/blog-service";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.slug, 3);

  return (
    <PageContainer className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
          {post.category}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-secondary-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatDate(post.publishedAt)} • {post.readingTimeMinutes} min read
        </p>

        <div className="mt-8 space-y-4 text-base leading-7 text-secondary-800">
          {post.content.map((paragraph, index) => (
            <p key={`${post.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>

      {relatedPosts.length ? (
        <section className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold text-secondary-900">
            Related Posts
          </h2>
          <ul className="mt-4 space-y-3">
            {relatedPosts.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/blog/${related.slug}`}
                  className="text-sm font-medium text-primary-700 hover:text-primary-800"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageContainer>
  );
}
