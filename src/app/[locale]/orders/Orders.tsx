import React, {FC} from 'react';

import {addCurrency} from "@/utils/add-currency";
import cn from 'clsx'
import {TypeOrderWithItems} from "@/lib/db/types";
import Image from 'next/image'

interface OrdersProps {
    orders: TypeOrderWithItems[]
}

const statusLabels: Record<string, string> = {
    pending: 'В обработке',
    paid: "Оплачен",
    shipped: "Отправлен",
    delivered: "Доставлен",
    canceled: "Отменены"
}

export const Orders: FC<OrdersProps> = ({orders}: OrdersProps) => {
    return (
        <div>
            <h1 className='font-bold text-4xl my-5'>Мои заказы</h1>
            {
                orders.length ? (
                    <div className="space-y-6">
                        {
                            orders.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-md w-full p-6">
                                    <div className="grid grid-cols-[1.5fr_1fr_3fr]">
                                        <div>
                                            <h3 className="font-bold text-xl">
                                                Заказ
                                                от {order.createdAt ? new Date(order.createdAt).toLocaleDateString('ru-RU') : 'Дата неизвестна'}
                                            </h3>
                                            <p className="text-gray-400">
                                                ID: {order.id.slice(0, 5).toUpperCase()}
                                            </p>
                                        </div>
                                        <div>
                                            <div className={cn("font-medium",
                                                order.status === 'paid' ? 'text-green-600' :
                                                    order.status === 'canceled' ? "text-red-600" :
                                                        order.status === 'delivered' ?
                                                            "text-blue-600" :
                                                            order.status === "shipped" ? "text-purple-600" :
                                                                order.status === 'pending' ? "text-yellow-600" : ""
                                            )}>
                                                {statusLabels[order.status] || 'Неизвестен'}
                                            </div>
                                            <div className="text-xl font-bold">
                                                {addCurrency(order.total)}
                                            </div>
                                        </div>
                                        <div>
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4 mb-2">
                                                    <Image className="rounded-md object-cover"
                                                           src={item.product.images[0]}
                                                           alt={item.product.name}
                                                           width={80} height={80}/>
                                                    <div>
                                                        <h2 className="font-medium">{item.product.name}</h2>
                                                        <div className="text-gray-400">
                                                            {item.quantity} (шт.) по {addCurrency(item.price)} каждая
                                                        </div>
                                                        <div>
                                                            Всего: {addCurrency(item.price * item.quantity)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        У вас еще нет заказов!
                    </div>
                )
            }
        </div>
    );
};