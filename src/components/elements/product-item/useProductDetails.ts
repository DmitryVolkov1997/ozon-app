import type { TypeProductWithReviews } from "@/lib/db/types";
import { useMemo } from "react";

export const useProductDetails = (product: TypeProductWithReviews) => {
  const discountPercent = useMemo(() => {
    if (!product.discountPrice) return null;

    return Math.round(
      ((product.price - product.discountPrice) / product.price) * 100,
    );
  }, [product.price, product.discountPrice]);

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
