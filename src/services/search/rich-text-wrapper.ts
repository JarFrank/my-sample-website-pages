import { Document as RichTextDocument } from "@contentful/rich-text-types";

export const getRichTextValues = (
  rte: RichTextDocument | undefined | null
): string => {
  if (!rte) {
    return "";
  }
  const result = collectAllValues(rte ?? { content: [] });
  return result.join(" ");
};

const collectValues = (richTextContent: RichTextDocument): string[] => {
  let values: string[] = [];

  for (const blocks of richTextContent.content) {
    for (const dd of blocks.content) {
      if (dd.nodeType === "text") {
        values.push(dd.value);
      }
      if (dd.nodeType === "paragraph") {
        values.push(dd.content.join(""));
      }
    }
  }

  return values;
};

const collectAllValues = (richTextContent: RichTextDocument): string[] => {
  return collectValues(richTextContent);
};
