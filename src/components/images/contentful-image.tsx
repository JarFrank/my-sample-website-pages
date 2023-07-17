"use client";
import type { ImageLoader, ImageLoaderProps, ImageProps } from "next/image";
import Image from "next/image";
import { CustomInspectorModeTags } from "../../../types";

const contentfulLoader: ImageLoader = (props: ImageLoaderProps) => {
  const extension = "webp";
  return `${props.src}?w=${props.width}&fm=${extension}&q=${
    props.quality || 75
  }`;
};

const contentfulSvgLoader: ImageLoader = (props: ImageLoaderProps) => {
  return `${props.src}?w=${props.width}&q=${props.quality || 75}`;
};

export type ContentfulImageProps = {
  inspectorTags?: CustomInspectorModeTags;
} & ImageProps;

const ContentfulImage = (props: ContentfulImageProps) => {
  const alt = props.alt ? props.alt : "";
  const src = (props.src as string)?.startsWith("//")
    ? `https:${props.src}`
    : (props.src as string);
  const className = AppendClassName(props);
  if (src?.endsWith(".svg")) {
    return <Image loader={contentfulSvgLoader} {...props} alt={alt} />;
  }
  return (
    <Image
      loader={contentfulLoader}
      {...props}
      {...props.inspectorTags}
      src={src}
      alt={alt}
      className={className}
    />
  );
};

const AppendClassName = (props: ImageProps) => {
  return props.className ? `${props.className} rounded-2xl` : "rounded-2xl";
};

export default ContentfulImage;
