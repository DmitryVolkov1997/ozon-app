import {useTransition} from "react";
import {updateCartItemQuantity} from "@/lib/actions/cart";
import {TypeProduct} from "@/lib/db/types";

interface Props {
    product: TypeProduct
    quantity: number
}

export const useChangeQuantity = ({product, quantity}: Props) => {
    const [isPendingQuantity, startTransitionQuantity] = useTransition();

    const updateQuantityInCart = (type: "increment" | "decrement") => {
        startTransitionQuantity(async () => {
            await updateCartItemQuantity(
                product.id,
                type === "increment" ? quantity + 1 : quantity - 1,
            );
        });
    };

    return {
        isPendingQuantity,
        updateQuantityInCart
    }
}