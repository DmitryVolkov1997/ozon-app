"use server"

import {getUser} from "@/lib/actions/user";
import {db} from "@/lib/db";
import {cart, order, orderItem} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {PAGES} from "@/config/pages.config";

export async function createOrder() {
    try {
        const user = await getUser()

        if (!user) {
            return {
                success: false,
                error: "UNAUTHORIZED",
            }
        }

        const userId = user.id

        const userCart = await db.query.cart.findFirst({
            where: (cart, {eq}) => eq(cart.userId, userId),
            with: {
                items: {
                    with: {
                        product: true
                    }
                }
            }
        })

        if (!userCart || userCart.items.length === 0) {
            return {
                success: false,
                error: "EMPTY_CART"
            }
        }

        const total = userCart.items.reduce((sum, item) => {
            const price = item.product.discountPrice ?? item.product.price

            return sum + price * item.quantity
        }, 0)

        await db.transaction(async (tx) => {
            const [createOrder] = await tx.insert(order).values({
                id: crypto.randomUUID(),
                userId,
                total,
                status: 'paid',
            }).returning()

            for (const item of userCart.items) {
                await tx.insert(orderItem).values({
                    id: crypto.randomUUID(),
                    orderId: createOrder.id,
                    price: item.product.discountPrice ?? item.product.price,
                    quantity: item.quantity,
                    productId: item.productId,
                })
            }

            await tx.delete(cart).where(eq(cart.id, userCart.id))

            return createOrder
        })

        revalidatePath(PAGES.CART)
        revalidatePath(PAGES.ORDERS)

        return {
            success: true,
        }
    } catch (e) {
        console.error("CREATE ORDER ERROR", e)
        return {
            success: false,
            error: "INTERNAL_ERROR",
        }
    }
}

export async function getUserOrders() {
    try {
        const user = await getUser()

        if (!user) {
            return {
                success: false,
                error: "UNAUTHORIZED"
            }
        }

        return await db.query.order.findMany({
            where: (order, {eq}) => eq(order.userId, user.id),
            with: {
                items: {
                    with: {
                        product: true
                    }
                }
            },
            orderBy: (order, {desc}) => [desc(order.createdAt)]
        })

    } catch (e) {
        console.error('GET USER ORDERS ERROR', e)

        return {
            success: false,
            error: "INTERNAL_ERROR",
        }
    }
}