import { TypeBlogPostSkeleton } from "../../../types/contentful";
import { getEntriesByContentType } from "../contentful-client";
import type { SearchSchema } from "./azure-search";
import { getRichTextValues } from "./rich-text-wrapper";

export const queryPages = async () => {
  const blogPosts = await getEntriesByContentType<TypeBlogPostSkeleton>(
    "blogPost"
  );
  const searchSchemaArray = blogPosts.map((blogPost) => {
    const { id } = blogPost.sys;
    const { slug, image, title, postBody } = blogPost.fields;
    const content = getRichTextValues(postBody);
    return {
      id: id,
      image: image?.fields.file?.url ?? "",
      description: content,
      name: title,
      url: `/blog/${slug}`,
    } satisfies SearchSchema;
  });
  return searchSchemaArray;
};
