import {useFavorites} from "@/hooks/useFavorites";
import {useProductDiscount} from "@/hooks/useProductDiscount";
import type {TCartItem} from "@/lib/db/types";
import Image from "next/image";
import {Circle, Heart, Trash2} from "lucide-react";
import {updateCartItemQuantity} from "@/lib/actions/cart";
import {ProductQuantity} from "@/components/product-quantity/ProductQuantity";
import {addCurrency} from "@/utils/add-currency";
import cn from "clsx";

interface CartItemProps {
    item: TCartItem;
}

export default function CartItem({item}: CartItemProps) {
    const {product, quantity} = item;
    const {isFavorite, toggleFavorite} = useFavorites(product);
    const {discountPercent} = useProductDiscount({
        price: product.price,
        discountPrice: product.discountPrice,
    });

    const totalPrice = product.price * quantity
    const totalPriceWithDiscount = product.discountPrice ? product.discountPrice * quantity : 0

    return (
        <div className="flex gap-5 my-2 items-start">
            <Image
                className="rounded shrink-0"
                src={product.images[0]}
                width={100}
                height={100}
                alt={product.name}
            />

            <div className="flex flex-col items-start max-w-xl w-full">
                <h2 className={cn('font-medium text-xl line-clamp-3')}>
                    {product.name}
                </h2>

                {discountPercent && (
                    <div
                        className="bg-black inline-flex items-center justify-center gap-x-2 rounded-xl text-white px-2.5 py-1 text-sm font-semibold">
                        <Circle size={10} className="fill-pink-600 stroke-pink-600"/>
                        <span>Вау цены</span>
                    </div>
                )}

                <div className="mt-3 inline-flex gap-x-2.5">
                    <button
                        className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-1.5"
                        onClick={toggleFavorite}
                    >
                        <Heart
                            className={cn(`transition-colors`, isFavorite ? "text-pink-600" : "text-black")}
                            size={20}
                            fill={'currentColor'}
                        />
                    </button>

                    <button
                        className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-1.5"
                        onClick={() => updateCartItemQuantity(product.id, 0)}
                    >
                        <Trash2
                            size={20}
                        />
                    </button>
                </div>
            </div>

            <div className='flex items-start gap-x-2'>
                 <span className="text-foreground text-xl font-semibold">
                {
                    addCurrency(product.discountPrice ? totalPriceWithDiscount : totalPrice)
                }
            	</span>

                {totalPriceWithDiscount &&
                    <div className="inline-flex gap-x-1 items-center">
                        <span className="text-base text-gray-400">
                            {addCurrency(totalPrice)}
                        </span>

                        {discountPercent && <span className="text-pink-500 text-xs">-{discountPercent}%</span>}
                    </div>
                }
            </div>

            <ProductQuantity quantity={quantity} product={product}/>
        </div>
    );
}

