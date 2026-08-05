"use client";
import { ProductItem } from "@/components/elements/product-item/ProductItem";
import { SkeletonLoader } from "@/components/ui/SceletonLoader";
import { getProductByIds } from "@/lib/actions/product";
import { favoritesProductIdAtom } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { FC } from "react";

const Favorites: FC = () => {
  const ids = useAtomValue(favoritesProductIdAtom);
  const { data, isPending, isError } = useQuery({
    queryKey: ["favoritesProduct", ids],
    queryFn: () => getProductByIds(ids),
    enabled: ids.length > 0,
  });

  if (ids.length === 0) {
    return (
      <div className="text-3xl font-bold text-gray-800 drop-shadow-sm mt-6 text-center">
        Избранных товаров пока нет
      </div>
    );
  }

  if (isPending) {
    return <SkeletonLoader count={ids.length} />;
  }

  if (isError) {
    return (
      <div className="text-3xl font-bold text-gray-800 drop-shadow-sm mt-6 text-center">
        Не удалось загрузить избранные товары
      </div>
    );
  }

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm mb-6">
        Избранное
      </h1>

      {data && data.length && (
        <div className="grid lg:grid-cols-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 justify-items-center">
          {data.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
