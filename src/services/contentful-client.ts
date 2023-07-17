import { Entry, EntrySkeletonType, createClient } from "contentful";
import { TypeBlogPostSkeleton } from "../../types/contentful";

const client = (preview: boolean) =>
  createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: preview
      ? (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string)
      : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
  });

export async function getFirstEntryByContentType<T extends EntrySkeletonType>(
  type: string,
  preview: boolean,
  include: 0 | 1 | 2 | 3 | 4 = 3
): Promise<Entry<T, "WITHOUT_UNRESOLVABLE_LINKS", string>> {
  const entry = await client(preview).withoutUnresolvableLinks.getEntries<T>({
    content_type: type,
    limit: 1,
    include: include,
  });
  const result = entry.items[0];
  return result;
}

export async function getEntriesByContentType<T extends EntrySkeletonType>(
  type: string,
  include: 0 | 1 | 2 | 3 | 4 = 3,
  preview: boolean = false
) {
  const entry = await client(preview).withoutUnresolvableLinks.getEntries<T>({
    content_type: type,
    include: include,
  });
  return entry.items;
}

export async function getBlogPostsBySlug(slug: string, preview: boolean) {
  const entry = await client(
    preview
  ).withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>({
    "fields.slug": slug,
    content_type: "blogPost",
    limit: 1,
    include: 5,
  });
  return entry.items[0];
}
