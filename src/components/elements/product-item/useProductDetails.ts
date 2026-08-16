import { useProductDiscount } from "@/hooks/useProductDiscount";
import type { TypeProductWithReviews } from "@/lib/db/types";
import { useMemo } from "react";

export const useProductDetails = (product: TypeProductWithReviews) => {
  const { discountPercent } = useProductDiscount({
    price: product.price,
    discountPrice: product.discountPrice,
  });

  const reviewAverage = useMemo(() => {
    if (!product.reviews.length) return 0;

    const totalRating = product.reviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );

    return Math.round(totalRating / product.reviews.length);
  }, [product.reviews]);

  return {
    discountPercent,
    reviewAverage,
  };
};
