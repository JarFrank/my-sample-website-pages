import { TypeHomeSkeleton } from "../../types/contentful";
import { getFirstEntryByContentType } from "./contentful-client";

export const getHome = async (preview: boolean) => {
  const home = await getFirstEntryByContentType<TypeHomeSkeleton>(
    "home",
    preview
  );
  return home;
};
