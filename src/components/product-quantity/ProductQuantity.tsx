"use client"
import React, {FC} from 'react';
import {Minus, Plus} from "lucide-react";
import {TypeProduct} from "@/lib/db/types";
import {useChangeQuantity} from "@/components/product-quantity/useChangeQuantity";

interface ProductQuantityProps {
    quantity: number;
    product: TypeProduct
}

export const ProductQuantity: FC<ProductQuantityProps> = ({quantity, product}) => {
    const {isPendingQuantity, updateQuantityInCart} = useChangeQuantity({product, quantity})

    return (
        <div className="inline-flex h-13 items-center gap-1 rounded-xl bg-blue-50 p-1">
            <button
                type="button"
                aria-label="Уменьшить количество"
                className="grid size-9 place-items-center rounded-lg text-blue-700 transition hover:bg-white hover:text-blue-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => updateQuantityInCart("decrement")}
                disabled={isPendingQuantity}
            >
                <Minus size={20} strokeWidth={3}/>
            </button>

            <span className="min-w-8 text-center font-bold text-blue-950">
                {quantity} 
              </span>

            <button
                type="button"
                aria-label="Увеличить количество"
                className="grid size-9 place-items-center rounded-lg text-blue-700 transition hover:bg-white hover:text-blue-900 active:scale-95"
                onClick={() => updateQuantityInCart("increment")}
                disabled={isPendingQuantity}
            >
                <Plus size={20} strokeWidth={3}/>
            </button>
        </div>
    );
};