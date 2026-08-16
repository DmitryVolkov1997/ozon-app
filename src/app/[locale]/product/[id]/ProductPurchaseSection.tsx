"use client";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/hooks/useFavorites";
import type { TypeProductWithReviews } from "@/lib/db/types";
import { addCurrency } from "@/utils/add-currency";
import { Heart } from "lucide-react";
import { FC } from "react";

interface IProductPurchaseSection {
  product: TypeProductWithReviews;
  discountPercent?: number | null;
}

const ProductPurchaseSection: FC<IProductPurchaseSection> = ({
  product,
  discountPercent,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites(product);

  return (
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
              <span className="text-pink-500 text-xs">-{discountPercent}%</span>
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
  );
};

export default ProductPurchaseSection;
