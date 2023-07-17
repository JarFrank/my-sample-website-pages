import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeBlogPostSkeleton } from "./TypeBlogPost";

export interface TypeHomeFields {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    posts: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlogPostSkeleton>>;
}

export type TypeHomeSkeleton = EntrySkeletonType<TypeHomeFields, "home">;
export type TypeHome<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeSkeleton, Modifiers, Locales>;
