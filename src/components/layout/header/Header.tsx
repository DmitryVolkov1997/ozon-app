"use client";
import {AuthLogin} from "@/components/auth/AuthLogin";
import {AuthRegister} from "@/components/auth/AuthRegister";
import {Link} from "@/i18n/navigation";
import {LayoutGrid} from "lucide-react";
import {useTranslations} from "next-intl";
import Image from "next/image";
import {useAuthModal} from "@/components/layout/header/useAuthModal";
import {HeaderSearch} from "@/components/layout/header/header-search/HeaderSearch";
import {HeaderUserMenu} from "@/components/layout/header/header-user-menu/HeaderUserMenu";

interface HeaderProps {
    cartCount: number
}

export const Header = ({cartCount}: HeaderProps) => {
    const t = useTranslations("header");
    const {isOpen, ref, setIsOpen, data, isPending, authMode, setAuthMode} = useAuthModal()

    return (
        <>
            <header>
                <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-6 items-center p-3">
                    <Link href="/">
                        <Image
                            className="w-30 h-15"
                            src="/logo.svg"
                            alt="Ozon"
                            width={120}
                            height={60}
                            loading={"eager"}
                        />
                    </Link>

                    <button
                        className="bg-primary text-white rounded-md p-2 flex items-center gap-2 hover:bg-primary/90">
                        <LayoutGrid/>

                        <span>{t("catalogTitle")}</span>
                    </button>


                    <HeaderSearch t={t}/>
                    <HeaderUserMenu user={data?.user || null} setIsOpen={setIsOpen} cartCount={cartCount}/>
                </div>
            </header>

            {isOpen && authMode === "login" && (
                <AuthLogin
                    isPending={isPending}
                    authMode="login"
                    ref={ref}
                    setIsOpen={setIsOpen}
                    setAuthMode={setAuthMode}
                    isOpen={isOpen}
                />
            )}

            {isOpen && authMode === "register" && (
                <AuthRegister
                    isPending={isPending}
                    authMode="register"
                    ref={ref}
                    setIsOpen={setIsOpen}
                    setAuthMode={setAuthMode}
                    isOpen={isOpen}
                />
            )}
        </>
    );
};
