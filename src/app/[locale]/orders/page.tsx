import {NO_INDEX_PAGE} from "@/constants";
import type {Metadata} from "next";
import {getUserOrders} from "@/lib/actions/order";
import {Orders} from "@/app/[locale]/orders/Orders";

export const metadata: Metadata = {
    title: "Заказы",
    ...NO_INDEX_PAGE,
};

async function OrdersPage() {
    const orders = await getUserOrders()

    if (!Array.isArray(orders)) {
        return (
            <div className='text-4xl text-center'>
                {orders.error}
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className='text-4xl text-center'>
                Заказов нет
            </div>
        )
    }

    return <Orders orders={orders}/>;
}

export default OrdersPage;
