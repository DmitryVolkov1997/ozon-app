"use client";
import { useProductDetails } from "@/components/elements/product-item/useProductDetails";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/hooks/useFavorites";
import type { TypeProductWithReviews } from "@/lib/db/types";
import { addCurrency } from "@/utils/add-currency";
import { declensionWord } from "@/utils/declension-word";
import cn from "clsx";
import { Circle, Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: TypeProductWithReviews;
}

function ProductDetails({ product }: ProductDetailsProps) {
  const { discountPercent, reviewAverage } = useProductDetails(product);
  const { isFavorite, toggleFavorite } = useFavorites(product);
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);

  return (
    <div className="grid grid-cols-[2fr_1.5fr_1.5fr] gap-x-5 mt-5 p-3 rounded-2xl shadow">
      <div className="shadow self-start rounded-2xl relative">
        <Image
          className="object-cover rounded-3xl"
          src={product.imageUrl}
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

      <div className="p-3 rounded-2xl">
        <div className="mb-3">
          <h1
            className={cn(
              "text-2xl font-bold",
              isTitleExpanded ? "" : "line-clamp-2",
            )}
          >
            {product.name}
          </h1>

          <button
            type="button"
            className="font-semibold text-pink-600"
            onClick={() => setIsTitleExpanded((value) => !value)}
          >
            {isTitleExpanded ? "Скрыть" : "Показать больше"}
          </button>
        </div>

        <div className="text-base font-semibold gap-x-1.5 flex items-center">
          <div className="flex items-center gap-x-1 text-gray-400">
            <Star className="fill-amber-500 stroke-amber-500" size={16} />
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

        <div className="mt-4">
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            Описание товара
          </h2>

          <div>
            <div
              className={cn(
                "leading-7 text-gray-600 whitespace-pre-line",
                !isDescriptionExpanded && "line-clamp-5",
              )}
            >
              {product.description}
            </div>

            {product.description && product.description.length > 300 && (
              <button
                type="button"
                className="mt-2 font-semibold text-pink-600"
                onClick={() => setIsDescriptionExpanded((value) => !value)}
              >
                {isDescriptionExpanded ? "Скрыть" : "Показать больше"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow self-start p-4">
        {product.discountPrice && (
          <div className="flex items-end gap-x-1 font-bold">
            <span className="text-foreground text-3xl">
              {addCurrency(product.discountPrice)}
            </span>

            <div className="flex items-baseline gap-x-1">
              <div className="relative inline-block">
                <span className="text-base text-gray-400 font-normal">
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

        <div className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl px-2 py-3 mt-3 flex items-center mb-5">
          <div className="text-black font-semibold text-base inline-flex items-center gap-x-2">
            <span className="rounded-md p-2 bg-amber-500">
              {addCurrency(Math.round(product.price / 12))}
            </span>

            <div className="flex flex-col">
              <sup className="text-sm">x 12 мес</sup>
              <sub className="text-gray-500">0 ₸ сегодня</sub>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <Button className="py-3">Добавить в корзину</Button>
          <button
            className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-3"
            onClick={toggleFavorite}
          >
            <Heart
              className="transition-colors"
              size={25}
              stroke={isFavorite ? "red" : "var(--color-primary)"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
