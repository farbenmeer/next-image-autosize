import Image, { ImageProps } from "next/image";
import React from "react";

export type NextImageFromFileProps = Partial<ImageProps> &
  Pick<ImageProps, "src">;

export default function NextImageFromFile(props: NextImageFromFileProps) {
  const [image, setImage] = React.useState<null | {
    width: number;
    height: number;
  }>(null);

  // Fall back to regular next/image if all necessary props are given
  if (typeof props.src !== "string" || (props.width && props.height)) {
    return <Image {...props} unoptimized />;
  }

  // No width and height available? Render raw img tag first to figure them out
  if (!image)
    return (
      <img
        src={props.src}
        onLoad={(event) => {
          const target = event.target as HTMLImageElement;
          setImage({ width: target.width, height: target.height });
        }}
      />
    );

  // Width and height have been figured out, render the next/image
  return (
    <Image
      {...props}
      src={props.src}
      width={image.width}
      height={image.height}
      unoptimized
    />
  );
}
