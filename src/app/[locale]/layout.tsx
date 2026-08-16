import {Header} from "@/components/layout/header/Header";
import {TopMenu} from "@/components/layout/top-menu/TopMenu";
import {routing} from "@/i18n/routing";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {ReactNode} from "react";
import {getCart} from "@/lib/actions/cart";

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({children, params}: Props) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const {count} = await getCart()

    return (
        <NextIntlClientProvider>
            <div className="container mx-auto">
                <Header cartCount={count}/>
                <TopMenu/>

                {children}
            </div>
        </NextIntlClientProvider>
    );
}
