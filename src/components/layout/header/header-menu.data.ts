import { PAGES } from "@/config/pages.config";
import { Heart, Package, ShoppingBasket, UserRoundPen } from "lucide-react";

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
  {
    id: 4,
    title: "Админка",
    link: PAGES.ADMIN,
    icon: UserRoundPen,
  },
] as const;
