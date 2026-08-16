"use server";
import {PAGES} from "@/config/pages.config";
import {and, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "../db";
import {cart, cartItem} from "../db/schema";
import {getUser} from "./user";

async function getOrCreateCart(userId: string) {
    let userCart = await db.query.cart.findFirst({
        where: eq(cart.userId, userId),
    });

    if (!userCart) {
        const [createdCart] = await db
            .insert(cart)
            .values({
                id: crypto.randomUUID(),
                userId,
            })
            .onConflictDoNothing({
                target: cart.userId,
            })
            .returning();

        userCart = createdCart;
    }

    if (!userCart) {
        throw new Error("Не удалось создать корзину");
    }

    return userCart;
}

export async function getCart() {
    try {
        const user = await getUser();

        if (!user) {
            return {
                items: [],
                total: 0,
                count: 0,
                totalDiscount: 0
            };
        }

        const userCart = await getOrCreateCart(user.id);

        const items = await db.query.cartItem.findMany({
            where: eq(cartItem.cartId, userCart.id),
            with: {
                product: true,
            },
        });

        const total = items.reduce((acc, item) => {
            const price = item.product.discountPrice ?? item.product.price;

            return acc + item.quantity * price;
        }, 0);

        const totalDiscount = items.reduce((acc, el) => {
            const discount = el.product.discountPrice ? (el.product.price - el.product.discountPrice) * el.quantity : 0

            return acc + discount
        }, 0)

        const count = items.reduce((acc, item) => acc + item.quantity, 0);

        return {
            items,
            total,
            count,
            totalDiscount
        };
    } catch (error) {
        console.error("Failed to get cart:", error);
        return {
            items: [],
            totalDiscount: 0,
            total: 0,
            count: 0,
        };
    }
}

export async function addItemToCart(productId: string, quantity: number = 1) {
    try {
        const user = await getUser();

        if (!user) {
            return {
                success: false,
                error: "UNAUTHORIZED",
            };
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return {
                success: false,
                error: "INVALID_QUANTITY",
            };
        }

        const userCart = await getOrCreateCart(user.id);

        const existingItem = await db.query.cartItem.findFirst({
            where: and(
                eq(cartItem.cartId, userCart.id),
                eq(cartItem.productId, productId),
            ),
        });

        if (existingItem) {
            await db
                .update(cartItem)
                .set({
                    quantity: existingItem.quantity + quantity,
                })
                .where(eq(cartItem.id, existingItem.id));
        } else {
            await db.insert(cartItem).values({
                id: crypto.randomUUID(),
                cartId: userCart.id,
                productId,
                quantity,
            });
        }

        revalidatePath(PAGES.CART);

        return {
            success: true,
        };
    } catch (error) {
        console.error("Failed to add item to cart:", error);

        return {
            success: false,
            error: "INTERNAL_ERROR",
        };
    }
}

export async function updateCartItemQuantity(
    productId: string,
    quantity: number,
) {
    try {
        const user = await getUser();

        if (!user) {
            return {
                success: false,
                error: "UNAUTHORIZED",
            };
        }

        if (!Number.isInteger(quantity)) {
            return {
                success: false,
                error: "INVALID_QUANTITY",
            };
        }

        const userCart = await getOrCreateCart(user.id);

        if (quantity <= 0) {
            await db
                .delete(cartItem)
                .where(
                    and(
                        eq(cartItem.productId, productId),
                        eq(cartItem.cartId, userCart.id),
                    ),
                );
        } else {
            await db
                .update(cartItem)
                .set({quantity})
                .where(
                    and(
                        eq(cartItem.productId, productId),
                        eq(cartItem.cartId, userCart.id),
                    ),
                );
        }

        revalidatePath(PAGES.CART);

        return {
            success: true,
        };
    } catch (error) {
        console.error("Failed to update item quantity:", error);

        return {
            success: false,
            error: "INTERNAL_ERROR",
        };
    }
}

export async function clearCart() {
    try {
        const user = await getUser();

        if (!user) {
            return {
                success: false,
                error: "UNAUTHORIZED",
            };
        }

        const userCart = await getOrCreateCart(user.id);

        await db.delete(cartItem).where(eq(cartItem.cartId, userCart.id));

        revalidatePath(PAGES.CART);
        return {
            success: true,
        };
    } catch (error) {
        console.error("Failed to clear cart item:", error);

        return {
            success: false,
            error: "INTERNAL_ERROR",
        };
    }
}

