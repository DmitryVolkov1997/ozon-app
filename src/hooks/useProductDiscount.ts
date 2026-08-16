import { useMemo } from "react";

interface Props {
  discountPrice?: number | null;
  price: number;
}

export const useProductDiscount = ({ price, discountPrice }: Props) => {
  const discountPercent = useMemo(() => {
    if (!discountPrice) return null;

    return Math.round(((price - discountPrice) / price) * 100);
  }, [price, discountPrice]);

  return {
    discountPercent,
  };
};
