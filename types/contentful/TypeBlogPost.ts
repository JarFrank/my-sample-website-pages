import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogPostFields {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    postBody: EntryFieldTypes.RichText;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
