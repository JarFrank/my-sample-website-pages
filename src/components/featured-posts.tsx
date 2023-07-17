import Link from "next/link";
import {
  ContentfulUnresolvableEntry,
  CustomInspectorModeTags,
} from "../../types";
import { TypeBlogPostSkeleton } from "../../types/contentful/TypeBlogPost";

type FeaturedPostsProps = {
  posts: ContentfulUnresolvableEntry<TypeBlogPostSkeleton>[];
  inspectortags?: CustomInspectorModeTags;
};

const FeaturedPosts = ({ posts, inspectortags }: FeaturedPostsProps) => {
  return (
    <div {...inspectortags} className="grid grid-cols-1 gap-6 pt-10">
      {posts.map((post) => (
        <Link
          className="hover:text-blue-500 transition-colors duration-200 border border-gray-300 shadow-md p-5"
          href={`/blog/${post?.fields.slug}`}
          key={post?.sys.id}
        >
          <h3>{post?.fields.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedPosts;
