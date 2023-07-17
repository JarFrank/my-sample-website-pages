import { IParams } from "@/services/IParams";
import { getBlogPost, getBlogPostSlugs } from "@/services/blog-service";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ContentfulUnresolvableEntry } from "../../../../types";
import { TypeBlogPostSkeleton } from "../../../../types/contentful";
import { Title } from "@/components/title";
import CustomRichText from "@/components/custom-rich-text";
import Shimmer from "@/components/images/shimmer";

type BlogPageProps = {
  model: ContentfulUnresolvableEntry<TypeBlogPostSkeleton>;
};

const BlogPage: NextPage<BlogPageProps> = (props) => {
  if (!props || !props.model) {
    throw new Error("Model is undefined");
  }
  const { title, postBody, image } = props.model.fields;
  return (
    <div>
      <Shimmer
        src={image?.fields.file?.url ?? ""}
        alt={image?.fields.title ?? ""}
        width={500}
        height={200}
        className="mx-auto"
        priority={true}
      />
      <Title title={title} />
      <CustomRichText content={postBody} />
    </div>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const isEnabled = context.preview ?? false;
  console.log({ isEnabled });
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
