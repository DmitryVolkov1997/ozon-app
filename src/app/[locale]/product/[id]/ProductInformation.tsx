"use client";
import type { TypeProductWithReviews } from "@/lib/db/types";
import { declensionWord } from "@/utils/declension-word";
import cn from "clsx";
import { MessageCircle, Star } from "lucide-react";
import { FC, useState } from "react";

interface IProductInformation {
  product: TypeProductWithReviews;
  reviewAverage: number;
}

const ProductInformation: FC<IProductInformation> = ({
  product,
  reviewAverage,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);

  return (
    <div className="p-3 rounded-2xl">
      <div className="mb-3">
        <h1
          className={cn("text-2xl font-bold", {
            "line-clamp-none": isTitleExpanded,
            "line-clamp-2": product.name.length > 60,
          })}
        >
          {product.name}
        </h1>

        {product.name.length > 60 && (
          <button
            type="button"
            className="font-semibold text-pink-600"
            onClick={() => setIsTitleExpanded((value) => !value)}
          >
            {isTitleExpanded ? "Скрыть" : "Показать больше"}
          </button>
        )}
      </div>

      <div className="text-base font-semibold gap-x-1.5 flex items-center">
        <div className="flex items-center gap-x-1 text-gray-400">
          <Star className="fill-amber-500 stroke-amber-500" size={16} />
          <span>{reviewAverage}</span>
        </div>

        <div className="flex items-center gap-x-1">
          <MessageCircle className="fill-gray-400 stroke-gray-400" size={13} />
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
  );
};

export default ProductInformation;
