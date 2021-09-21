import Image, { ImageProps } from "next/image";
import React from "react";

export type NextImageFromFileProps = Partial<ImageProps> &
  Pick<ImageProps, "src">;

function isImageProps(props: NextImageFromFileProps): props is ImageProps {
  return typeof props.src !== "string" || !!(props.width && props.height);
}

export default function NextImageFromFile(props: NextImageFromFileProps) {
  const [image, setImage] = React.useState<null | {
    width: number;
    height: number;
  }>(null);

  if (isImageProps(props)) {
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
