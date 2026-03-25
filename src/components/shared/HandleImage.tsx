"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { ImageProps } from "next/image";
// Ensure this path matches your project structure
import DummyImage from "@/app/icon.png"; 

type HandledImageProps = ImageProps;

const HandledImage = ({
  src: originalSrc,
  alt = "product image",
  className = "",
  ...rest
}: HandledImageProps) => {
  const [actualSrc, setActualSrc] = useState<any>(originalSrc);

  useEffect(() => {
    if (!originalSrc || originalSrc.toString().trim() === "") {
      setActualSrc(DummyImage);
      return;
    }

    if (typeof originalSrc === "string" && originalSrc.startsWith("/upload")) {
      // Use the API base URL to prefix relative paths
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
      setActualSrc(`${baseUrl}${originalSrc}`);
      return;
    }

    setActualSrc(originalSrc);
  }, [originalSrc]);

  return (
    <Image
      src={actualSrc || DummyImage}
      alt={alt}
      className={className}
      // If the URL is valid but the image is missing on the server, use fallback
      onError={() => setActualSrc(DummyImage)}
      {...rest}
    />
  );
};

export default HandledImage;