import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import React from "react";
import ContentfulImage from "./images/contentful-image";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import Blockquote from "./blockquote";
import { CustomInspectorModeTags } from "../../types";
import Link from "next/link";

const paragraphClass = () => {
  const className = "rte-paragraph pb-3 text-base";
  return className;
};

const customMarkdownOptions = (className: string | undefined): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const file = node.data.target.fields.file;
      return (
        <div className="relative">
          <ContentfulImage
            src={file.url}
            alt={file.fileName}
            className="absolute object-cover"
            height={300}
            width={500}
          />
        </div>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
      if (node.content && node.content[0].value === "") {
        return <br />;
      }
      const cls = `${className ?? ""} ${paragraphClass()}`;
      return <p className={cls}>{children}</p>;
    },
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => {
      return <Blockquote>{children}</Blockquote>;
    },
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => {
      return <h3 className="lg:text-5xl md:text-4xl text-3xl">{children}</h3>;
    },
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => {
      return <h3 className="lg:text-4xl md:text-3xl text-2xl">{children}</h3>;
    },
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => {
      return <h3 className="lg:text-3xl md:text-2xl text-xl">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => {
      return <h3 className="lg:text-2xl md:text-xl text-lg">{children}</h3>;
    },
    [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => {
      return <h3 className="lg:text-xl md:text-lg text-lg">{children}</h3>;
    },
    [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => {
      return <h3 className="text-lg">{children}</h3>;
    },
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => {
      return <li className="list-item">{children}</li>;
    },
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => {
      return <ol className="list-decimal pl-5">{children}</ol>;
    },
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => {
      return <ul className="list-disc pl-5">{children}</ul>;
    },
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
      const url = "/blog/" + node.data.target.fields.slug;
      return (
        <Link
          href={url}
          className="inline-flex text-blue-500 no-underline border-b border-blue-500 hover:text-blue-600 hover:border-blue-600"
        >
          {children}
        </Link>
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (node: any) => (
      <strong className="font-semibold">{node}</strong>
    ),
  },
});

type Props = {
  content: RichTextDocument;
  className?: string;
  classParagraph?: string;
  inspectortags?: CustomInspectorModeTags;
};

export default function CustomRichText(props: Props) {
  const { content, className, classParagraph } = props;

  return (
    <div {...props.inspectortags} className={className}>
      {documentToReactComponents(
        {
          content: content.content,
          nodeType: BLOCKS.DOCUMENT,
          data: content.data,
        },
        customMarkdownOptions(classParagraph)
      )}
    </div>
  );
}
