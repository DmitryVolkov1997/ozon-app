"use client";
import type {TypeProductWithReviews} from "@/lib/db/types";
import {addCurrency} from "@/utils/add-currency";
import {FC} from "react";
import {ProductQuantity} from "@/components/product-quantity/ProductQuantity";
import {AddToCartButton} from "@/components/add-to-cart-button/AddToCartButton";
import {toast} from "sonner";
import {ShoppingCart} from "lucide-react";
import {addItemToCart} from "@/lib/actions/cart";
import {FavoriteButton} from "@/components/favorite-button/FavoriteButton";
import {InCartButton} from "@/components/ in-cart-button/ InCartButton";

interface IProductPurchaseSection {
    product: TypeProductWithReviews;
    discountPercent?: number | null;
    quantity: number;
}

const ProductPurchaseSection: FC<IProductPurchaseSection> = ({
                                                                 product,
                                                                 discountPercent,
                                                                 quantity,
                                                             }) => {
    const purchaseProduct = async () => {
        const result = await addItemToCart(product.id);

        if (result.success) {
            toast.success("Товар добавлен в корзину", {
                id: product.id,
                description: "Количество товара обновлено",
                icon: <ShoppingCart className="size-5 text-primary"/>,
            });
        } else {
            toast.error("Не удалось добавить товар в корзину", {
                id: product.id,
            });
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow self-start p-4">
            <div className="flex items-end gap-x-1 font-bold">
				<span className="text-foreground text-3xl">
					{addCurrency(product.discountPrice ?? product.price)}
				</span>

                {product.discountPrice && (
                    <div className="flex items-baseline gap-x-1">
                        <div className="relative inline-block">
							<span className="text-base text-gray-400 font-normal">
								{addCurrency(product.price)}
							</span>

                            <span
                                className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-[-5deg] bg-gray-400"/>
                        </div>

                        {discountPercent && <span className="text-pink-500 text-xs">-{discountPercent}%</span>}
                    </div>
                )}
            </div>

            <div
                className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl px-2 py-3 mt-3 flex items-center mb-5">
                <div className="text-black font-semibold text-base inline-flex items-center gap-x-2">
          <span className="rounded-md p-2 bg-amber-500">
           	{addCurrency(Math.round(product.discountPrice ?? product.price / 12))}
          </span>

                    <div className="flex flex-col">
                        <sup className="text-sm">x 12 мес</sup>
                        <sub className="text-gray-500">0 ₸ сегодня</sub>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                {quantity > 0 ? (
                    <div className="flex items-center gap-x-4">
                        <InCartButton/>
                        <ProductQuantity product={product} quantity={quantity}/>
                    </div>
                ) : (
                    <AddToCartButton purchaseProduct={purchaseProduct}/>
                )}

                <FavoriteButton product={product}/>
            </div>
        </div>
    );
};

export default ProductPurchaseSection;
