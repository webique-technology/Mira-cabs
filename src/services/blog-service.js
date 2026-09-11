import { blogs as blogData } from "@/data/blogs";
import { mockDelay } from "@/services/mock-delay";

/** TODO(API migration): swap for GET /api/blog */
export async function getBlogPosts() {
  await mockDelay();
  return blogData;
}

export async function getBlogPostBySlug(slug) {
  await mockDelay(300);
  return blogData.find((post) => post.slug === slug);
}

export async function getFeaturedBlogPost() {
  await mockDelay(200);
  return blogData.find((post) => post.featured) ?? blogData[0];
}

export async function getRelatedBlogPosts(slug, limit = 3) {
  await mockDelay(200);
  const current = blogData.find((post) => post.slug === slug);
  if (!current) return blogData.slice(0, limit);
  return blogData
    .filter((post) => post.slug !== slug && post.category === current.category)
    .slice(0, limit);
}
