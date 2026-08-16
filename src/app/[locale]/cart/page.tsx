import {NO_INDEX_PAGE} from "@/constants";
import {getCart} from "@/lib/actions/cart";
import type {Metadata} from "next";
import Cart from "./Cart";

export const metadata: Metadata = {
    title: "Корзина",
    ...NO_INDEX_PAGE,
};

async function CartPage() {
    const cart = await getCart();

    return <Cart cart={cart}/>;
}

export default CartPage;
