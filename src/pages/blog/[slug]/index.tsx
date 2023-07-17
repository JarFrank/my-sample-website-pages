import { IParams } from "@/services/IParams";
import { getBlogPost, getBlogPostSlugs } from "@/services/blog-service";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ContentfulUnresolvableEntry } from "../../../../types";
import { TypeBlogPostSkeleton } from "../../../../types/contentful";
import { Title } from "@/components/title";
import CustomRichText from "@/components/custom-rich-text";
import Shimmer from "@/components/images/shimmer";
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";

type BlogPostPageProps = {
  model: ContentfulUnresolvableEntry<TypeBlogPostSkeleton>;
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ model }) => {
  if (!model) {
    throw new Error("Model is undefined");
  }
  const updatedPost = useContentfulLiveUpdates(model);
  const inspectorProps = useContentfulInspectorMode({
    entryId: model.sys.id,
  });

  return (
    <div>
      <Shimmer
        src={updatedPost?.fields.image?.fields.file?.url ?? ""}
        alt={updatedPost?.fields.image?.fields.title ?? ""}
        width={500}
        height={200}
        className="mx-auto"
        priority={true}
        inspectortags={inspectorProps({ fieldId: "image" })}
      />
      <Title
        tags={inspectorProps({ fieldId: "title" })}
        title={updatedPost?.fields.title || ""}
      />
      <CustomRichText
        inspectortags={inspectorProps({ fieldId: "postBody" })}
        content={updatedPost?.fields.postBody}
      />
    </div>
  );
};

export default BlogPostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const draftMode = context.draftMode ?? false;
  const entry = await getBlogPost(slug, draftMode);
  return {
    props: {
      model: entry,
      draftMode: draftMode,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getBlogPostSlugs();
  const paths = slugs.map((slug) => {
    return { params: { slug: slug } };
  });
  return {
    paths,
    fallback: false,
  };
};
