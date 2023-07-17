import ContentfulImage, { ContentfulImageProps } from "./contentful-image";

/**
 * Parrent component for all images that should fill the container.
 * className should be set to relative
 */
export default function Background(props: ContentfulImageProps) {
  return (
    <ContentfulImage
      {...props}
      quality={100}
      fill
      sizes="100vw"
      style={{ ...props.style, objectFit: "cover", zIndex: -1 }}
    />
  );
}
