"use client";
import { PAGES } from "@/config/pages.config";
import { useFavorites } from "@/hooks/useFavorites";
import { Link } from "@/i18n/navigation";
import { TypeProductWithReviews } from "@/lib/db/types";
import { addCurrency } from "@/utils/add-currency";
import { declensionWord } from "@/utils/declension-word";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { Circle, Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useProductDetails } from "./useProductDetails";

interface ProductItemProps {
  product: TypeProductWithReviews;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reference, setReference] = useState<HTMLDivElement | null>(null);
  const [floating, setFloating] = useState<HTMLDivElement | null>(null);
  const { floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
    elements: {
      reference,
      floating,
    },
  });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const { discountPercent, reviewAverage } = useProductDetails(product);
  const { isFavorite, toggleFavorite } = useFavorites(product);

  return (
    <div className="relative h-full rounded-2xl bg-white shadow animate-zoom-once">
      <div className="relative overflow-hidden rounded-2xl">
        <Link href={PAGES.PRODUCT_DETAILS(product.id)}>
          <Image
            className="w-full object-cover"
            src={product.imageUrl}
            alt={product.name}
            width={280}
            height={180}
            draggable="false"
            loading="eager"
          />
        </Link>

        <button className="absolute top-2 right-2" onClick={toggleFavorite}>
          <Heart
            className="transition-colors"
            size={25}
            fill={isFavorite ? "red" : "white"}
            stroke={isFavorite ? "red" : "black"}
          />
        </button>

        {discountPercent && discountPercent >= 50 && (
          <div className="bg-black absolute bottom-2 left-2 flex items-center justify-center gap-x-2 rounded-xl text-white px-2.5 py-1 text-sm font-semibold">
            <Circle size={10} className="fill-pink-600 stroke-pink-600" />
            <span>Вау цены</span>
          </div>
        )}
      </div>

      <div className="p-2">
        <span className="text-amber-500 font-semibold text-xl">
          {addCurrency(Math.round(product.price / 12))} x 12 мес
        </span>

        {product.discountPrice && (
          <div className="flex items-end gap-x-1 font-semibold">
            <span className="text-pink-600">
              {addCurrency(product.discountPrice)}
            </span>

            <div className="flex items-baseline gap-x-1">
              <div className="relative inline-block">
                <span className="text-xs text-gray-400">
                  {addCurrency(product.price)}
                </span>

                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-[-5deg] bg-gray-400" />
              </div>

              {discountPercent && (
                <span className="text-pink-500 text-xs">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </div>
        )}

        <Link href={PAGES.PRODUCT_DETAILS(product.id)}>
          <div
            ref={setReference}
            {...getReferenceProps()}
            className="line-clamp-2"
          >
            {product.name}
          </div>
        </Link>

        {isOpen && (
          <FloatingPortal>
            <div
              ref={setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-10 max-w-75 rounded-lg bg-black p-2.5 text-sm text-white shadow-xl"
            >
              {product.name}
            </div>
          </FloatingPortal>
        )}

        <div className="text-xs font-semibold flex items-center gap-x-1.5">
          <div className="flex items-center gap-x-1">
            <Star className="fill-amber-500 stroke-amber-500" size={13} />
            <span>{reviewAverage}</span>
          </div>

          <div className="flex items-center gap-x-1">
            <MessageCircle
              className="fill-gray-400 stroke-gray-400"
              size={13}
            />
            <span className="text-gray-400">
              {product.reviews.length || 0}&nbsp;
              {declensionWord(product.reviews.length || 0, [
                "отзыв",
                "отзыва",
                "отзывов",
              ])}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
