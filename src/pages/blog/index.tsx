import React from "react";
import { ContentfulUnresolvableEntry } from "../../../types";
import { TypeBlogSkeleton } from "../../../types/contentful/TypeBlog";
import { GetStaticProps, NextPage } from "next";
import { getBlog } from "@/services/blog-service";
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";
import CustomRichText from "@/components/custom-rich-text";
import { Title } from "@/components/title";
import FeaturedPosts from "@/components/featured-posts";

type BlogPageProps = {
  model: ContentfulUnresolvableEntry<TypeBlogSkeleton>;
};

const BlogPage: NextPage<BlogPageProps> = ({ model }) => {
  if (!model) {
    throw new Error("Model is undefined");
  }
  const updatedPost = useContentfulLiveUpdates(model);
  const inspectorProps = useContentfulInspectorMode({
    entryId: model.sys.id,
  });

  const { title, description, posts } = updatedPost?.fields;
  return (
    <div>
      <Title tags={inspectorProps({ fieldId: "title" })} title={title || ""} />
      <CustomRichText
        inspectortags={inspectorProps({ fieldId: "description" })}
        content={description}
      />
      {posts &&
        FeaturedPosts({
          posts,
          inspectortags: inspectorProps({ fieldId: "posts" }),
        })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const draftMode = context.draftMode ?? false;
  const entry = await getBlog(draftMode);
  return {
    props: {
      model: entry,
      draftMode: draftMode,
    },
  };
};

export default BlogPage;
