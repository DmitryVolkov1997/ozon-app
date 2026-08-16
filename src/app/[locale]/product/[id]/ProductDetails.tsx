"use client";
import { useProductDetails } from "@/components/elements/product-item/useProductDetails";
import type { TypeProductWithReviews } from "@/lib/db/types";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ProductDetailsGallery from "./ProductDetailsGallery";
import ProductInformation from "./ProductInformation";
import ProductPurchaseSection from "./ProductPurchaseSection";

interface ProductDetailsProps {
  product: TypeProductWithReviews;
}

function ProductDetails({ product }: ProductDetailsProps) {
  const { discountPercent, reviewAverage } = useProductDetails(product);

  return (
    <div className="flex flex-col">
      <Breadcrumbs />
      <div className="grid grid-cols-[2fr_1.4fr_1.2fr] gap-x-5 mt-5 p-3 rounded-2xl shadow">
        <ProductDetailsGallery
          product={product}
          discountPercent={discountPercent}
        />

        <ProductInformation product={product} reviewAverage={reviewAverage} />

        <ProductPurchaseSection
          discountPercent={discountPercent}
          product={product}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
