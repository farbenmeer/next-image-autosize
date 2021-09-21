import Image, { ImageProps } from "next/image";
import React from "react";

export type NextImageFromFileProps = Partial<ImageProps> &
  Pick<ImageProps, "src">;

export default function NextImageFromFile(props: NextImageFromFileProps) {
  const [image, setImage] = React.useState<null | {
    width: number;
    height: number;
  }>(null);
  const imageRef = React.useRef<null | HTMLImageElement>(null);

  // In case the image was cached and won't trigger onLoad
  // read width and height from the ref
  React.useEffect(() => {
    // image already there or not rendered yet?
    if (image || !imageRef.current) return;
    // image has not been loaded yet?
    if (imageRef.current.complete === false) return;
    // width and height are 0 so the image has not been painted yet?
    if (imageRef.current.width === 0 || imageRef.current.height === 0) return;

    setImage({
      width: imageRef.current.width,
      height: imageRef.current.height,
    });
  });

  // Fall back to regular next/image if all necessary props are given
  if (typeof props.src !== "string" || (props.width && props.height)) {
    return <Image {...props} unoptimized />;
  }

  // No width and height available? Render raw img tag first to figure them out
  if (!image)
    return (
      <img
        src={props.src}
        ref={imageRef}
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
