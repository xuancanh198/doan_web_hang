"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type AppImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallback?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  className?: string;
};

export default function AppImage({
  src,
  alt,
  fallback = "/fallback.png",
  defaultWidth = 300,
  defaultHeight = 200,
  width,
  height,
  fill,
  className,
  ...props
}: AppImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      loading="lazy"
      width={fill ? undefined : width ?? defaultWidth}
      height={fill ? undefined : height ?? defaultHeight}
      fill={fill}
      className={className}
      {...props}
    />
  );
}
