import { Heart, Package, ShoppingBasket, User } from "lucide-react";
import { PAGES } from "@/config/pages.config";

export const headerMenu = [
	{
		id: 1,
		title: "Заказы",
		link: PAGES.ORDERS,
		icon: Package,
	},
	{
		id: 2,
		title: "Избранное",
		link: PAGES.FAVORITES,
		icon: Heart,
	},
	{
		id: 3,
		title: "Корзина",
		link: PAGES.CART,
		icon: ShoppingBasket,
	},
] as const;
