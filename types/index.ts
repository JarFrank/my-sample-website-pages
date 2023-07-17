import { Entry, EntrySkeletonType } from "contentful";

export type ContentfulUnresolvableEntry<T extends EntrySkeletonType> =
  | Entry<T, "WITHOUT_UNRESOLVABLE_LINKS", string>
  | undefined;
