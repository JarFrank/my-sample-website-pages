import { TypeBlogSkeleton } from "../../types/contentful";
import { TypeBlogPostSkeleton } from "../../types/contentful/TypeBlogPost";
import {
  getEntriesByContentType,
  getBlogPostsBySlug,
  getFirstEntryByContentType,
} from "./contentful-client";

export const getBlogPostSlugs = async () => {
  const posts = await getEntriesByContentType<TypeBlogPostSkeleton>("blogPost");
  return posts.map((post) => post.fields.slug);
};

export const getBlogPost = async (slug: string, preview: boolean) => {
  return await getBlogPostsBySlug(slug, preview);
};

export const getBlogPostUrl = async (slug: string) => {
  const blogPostSlug = await getBlogPostsBySlug(slug, false);
  return `/blog/${blogPostSlug.fields.slug}`;
};

export const getBlog = async (preview: boolean) => {
  const home = await getFirstEntryByContentType<TypeBlogSkeleton>(
    "blog",
    preview
  );
  return home;
};
