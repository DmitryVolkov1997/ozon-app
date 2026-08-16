"use client";

import type {TCartFull} from "@/lib/db/types";
import CartItem from "./CartItem";
import {Button} from "@/components/ui/Button";
import {addCurrency} from "@/utils/add-currency";
import {useTransition} from "react";
import {createOrder} from "@/lib/actions/order";
import {useRouter} from "@/i18n/navigation";
import {PAGES} from "@/config/pages.config";
import {toast} from "sonner";

interface CartProps {
    cart: TCartFull;
}

function Cart({cart}: CartProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleCheckout = () => {
        startTransition(async () => {
            const result = await createOrder()

            if (result.success) {
                toast.success('Заказ успешно создан!', {
                    id: 'create-order'
                })
                router.push(PAGES.ORDERS)
            } else {
                toast.error('Не удалось создать заказ!', {
                    id: 'create-order'
                })
            }
        })
    }

    return (
        <div className="my-6">
            <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm mb-6">
                Корзина
            </h1>

            <div className="grid grid-cols-[2.5fr_1fr] items-start gap-6">
                <div className="flex flex-col gap-4 shadow-2xl px-4 py-6 rounded-2xl">
                    {cart.items.length > 0
                        ? cart.items.map((item) => {
                            return <CartItem key={item.id} item={item}/>;
                        })
                        : <div className='text-4xl text-center'>Корзина пуста</div>}
                </div>


                <div className="flex flex-col w-full shadow-2xl px-4 py-6 rounded-2xl">
                    <Button variant='secondary' className="py-4 mb-3" disabled={isPending} onClick={handleCheckout}>
                        {isPending ? "Оформление..." : "Перейти к оформлению"}
                    </Button>

                    <p className="text-gray-500">
                        Доступные способы и время доставки можно выбрать при оформлении заказа
                    </p>

                    <hr className="border-gray-300 my-6"/>

                    <div className="font-bold text-xl mb-3">Ваша корзина</div>

                    <div>
                        <div className="flex justify-between items-center">
                            <span>Товары ({cart.count})</span>
                            <span>{addCurrency(cart.total)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Скидка -</span>
                            <span>{addCurrency(cart.totalDiscount)}</span>
                        </div>
                    </div>

                    <hr className="border-gray-300 my-6"/>

                    <div className="flex justify-between items-center font-bold text-xl">
                        <span className="">Общая стоимость</span>
                        <span>{addCurrency(cart.total - cart.totalDiscount)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Cart;
