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
import Image from "next/image";

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
  const { image, postBody, title } = updatedPost.fields;
  const url = "https:" + image?.fields.file?.url;
  const arrray = [0, 1, 2, 3, 4, 5];
  return (
    <div>
      <div className={`mx-auto py-16`}>
        <div className="grid grid-cols-1 gap-y-4 gap-x-6 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
          {arrray.map((item) => (
            <div key={item} className="relative w-full h-96">
              <Image
                src={url}
                alt={image?.fields.title ?? ""}
                fill
                sizes="(max-width: 639px) 596px, (max-width: 1023px) 478px, (max-width: 1280px) 357px, 306px"
                className="mx-auto object-cover"
                priority={true}
              />
            </div>
          ))}
        </div>
      </div>

      <Title
        inspectortags={inspectorProps({ fieldId: "title" })}
        title={title}
      />
      <CustomRichText
        inspectortags={inspectorProps({ fieldId: "postBody" })}
        content={postBody}
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
      draftMode,
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
