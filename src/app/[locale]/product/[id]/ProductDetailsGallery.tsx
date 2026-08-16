"use client";
import type { TypeProductWithReviews } from "@/lib/db/types";
import cn from "clsx";
import { Circle } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface IProductDetailsGallery {
  product: TypeProductWithReviews;
  discountPercent?: number | null;
}

const ProductDetailsGallery: FC<IProductDetailsGallery> = ({
  product,
  discountPercent,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex gap-x-3.5">
      <div className="flex flex-col gap-1.5">
        {product.images.map((image, index) => (
          <button
            key={image}
            className={cn(
              "rounded-xl border-2 p-1 w-20 h-25 overflow-hidden",
              index === activeImageIndex
                ? "border-primary"
                : "border-transparent",
            )}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            onFocus={() => setActiveImageIndex(index)}
          >
            <Image
              className="object-cover rounded-xl w-full h-full"
              src={product.images[index]}
              alt={product.name}
              height={90}
              width={90}
            />
          </button>
        ))}
      </div>

      <div className="shadow self-start rounded-2xl relative max-w-125 w-full overflow-hidden aspect-3/4">
        <Image
          className="object-cover rounded-2xl w-full"
          src={product.images[activeImageIndex]}
          alt={product.name}
          height={667}
          width={500}
        />

        {discountPercent && discountPercent >= 50 && (
          <div className="bg-black absolute top-2 right-2 flex items-center justify-center gap-x-2 rounded-xl text-white px-2.5 py-1 text-sm font-semibold">
            <Circle size={10} className="fill-pink-600 stroke-pink-600" />
            <span>Вау цены</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsGallery;
