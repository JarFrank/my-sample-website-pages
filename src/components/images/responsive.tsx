import { ImageProps } from "next/image";
import ContentfulImage from "./contentful-image";

/**
 * Should have width and height set
 */
export default function Responsive(props: ImageProps) {
  return (
    <div className="flex flex-col">
      <ContentfulImage {...props} sizes="100vw" className="w-full h-auto" />
    </div>
  );
}
