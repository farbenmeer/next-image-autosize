import Image, { ImageProps } from "next/image";
import React from "react";

export default function NextImageFromFile(props: ImageProps) {
  const [image, setImage] = React.useState<null | {
    width: number;
    height: number;
  }>(null);

  if (typeof props.src !== "string" || (props.width && props.height)) {
    return <Image {...props} unoptimized />;
  }

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
