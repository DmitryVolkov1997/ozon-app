import {Banana, BriefcaseBusiness, CreditCard, LucideIcon, Plane} from 'lucide-react';
import {PAGES} from "@/config/pages.config";

interface ITopMenu {
    id: number
    title: string
    href: string
    icon?: LucideIcon
}

export const topMenu: ITopMenu[] = [
    {
        id: 1,
        title: 'Ozon fresh',
        href: PAGES.FRESH,
        icon: Banana
    },
    {
        id: 2,
        title: 'Ozon карта',
        href: PAGES.OZON_CARD,
        icon: CreditCard
    },
    {
        id: 3,
        title: 'Авиа-билеты',
        href: PAGES.AIR_TICKETS,
        icon: Plane
    },
    {
        id: 4,
        title: 'Для бизнеса',
        href: PAGES.FOR_BUSINESS,
        icon: BriefcaseBusiness
    },
    {
        id: 5,
        title: 'Одежда',
        href: PAGES.CLOTHING,
    },
    {
        id: 6,
        title: 'Электроника',
        href: PAGES.ELECTRONICS,
    },
    {
        id: 7,
        title: 'Дом и сад',
        href: PAGES.HOME_AND_GARDEN,
    },
    {
        id: 8,
        title: 'Товары за 1₽',
        href: PAGES.PRODUCTS_FOR_1_RUB,
    },
    {
        id: 9,
        title: 'Сертификаты',
        href: PAGES.CERTIFICATES,
    }
]
