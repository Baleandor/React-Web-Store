import { useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ProductImage({
  src,
  alt,
  className = "",
}: ProductImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-zinc-100 ${className}`}
    >
      {status === "loading" && (
        <span
          className="absolute inset-0 animate-pulse bg-zinc-300"
          aria-hidden
        />
      )}
      {status === "error" ? (
        <span className="p-4 text-center text-sm text-zinc-500">
          Image unavailable
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`size-full object-contain p-4 transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
