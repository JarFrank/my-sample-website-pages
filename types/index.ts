import { Entry, EntrySkeletonType } from "contentful";

export type ContentfulUnresolvableEntry<T extends EntrySkeletonType> =
  | Entry<T, "WITHOUT_UNRESOLVABLE_LINKS", string>
  | undefined;

export type CustomInspectorModeTags = {
  ["data-contentful-field-id"]?: string | undefined;
  ["data-contentful-entry-id"]?: string | undefined;
  ["data-contentful-locale"]?: string | undefined;
} | null;
