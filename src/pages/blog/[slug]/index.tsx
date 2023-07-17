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

type BlogPageProps = {
  model: ContentfulUnresolvableEntry<TypeBlogPostSkeleton>;
};

const BlogPage: NextPage<BlogPageProps> = ({ model }) => {
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
        inspectorTags={inspectorProps({ fieldId: "title" })}
      />
      <Title
        tags={inspectorProps({ fieldId: "title" })}
        title={updatedPost?.fields.title || ""}
      />
      <CustomRichText
        inspectorTags={inspectorProps({ fieldId: "description" })}
        content={updatedPost?.fields.postBody}
      />
    </div>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const isEnabled = context.draftMode ?? false;
  const entry = await getBlogPost(slug, isEnabled);
  return {
    props: {
      model: entry,
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
