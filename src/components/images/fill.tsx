import { ImageProps } from "next/image";
import ContentfulImage from "./contentful-image";

/**
 * Parrent component for all images that should fill the container.
 * className should be set to relative
 */
const Fill = (props: ImageProps) => (
  <ContentfulImage
    {...props}
    fill
    sizes="100vw"
    style={{
      objectFit: "cover",
    }}
  />
);

export default Fill;
