import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeBlogPostSkeleton } from "./TypeBlogPost";

export interface TypeBlogFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    posts: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlogPostSkeleton>>;
}

export type TypeBlogSkeleton = EntrySkeletonType<TypeBlogFields, "blog">;
export type TypeBlog<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogSkeleton, Modifiers, Locales>;
