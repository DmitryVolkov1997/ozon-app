import { getCart } from "@/lib/actions/cart";
import { getProductById } from "@/lib/actions/product";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

export const metadata: Metadata = {
  title: "Product details",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const cart = await getCart();
  const quantity =
    cart.items.find((item) => item.productId === product.id)?.quantity || 0;

  return <ProductDetails product={product} quantity={quantity} />;
}
