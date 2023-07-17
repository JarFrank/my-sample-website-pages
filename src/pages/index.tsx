import { TypeHomeSkeleton } from "../../types/contentful";
import { ContentfulUnresolvableEntry } from "../../types";
import { Title } from "@/components/title";
import CustomRichText from "@/components/custom-rich-text";
import FeaturedPosts from "@/components/featured-posts";
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";
import { GetStaticProps } from "next";
import { getHome } from "@/services/home-service";

type HomePageProps = {
  model: ContentfulUnresolvableEntry<TypeHomeSkeleton>;
};

export default function Home({ model }: HomePageProps) {
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
}

export const getStaticProps: GetStaticProps = async (context) => {
  const draftMode = context.draftMode ?? false;
  const entry = await getHome(draftMode);
  return {
    props: {
      model: entry,
      draftMode,
    },
  };
};
