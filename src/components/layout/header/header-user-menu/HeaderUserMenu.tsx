import React, {Dispatch, FC, SetStateAction} from 'react';
import cn from 'clsx'
import {User} from "@/lib/auth";
import {useOutsideClick} from "@/hooks/useOutsideClick";
import {Link, usePathname} from "@/i18n/navigation";
import {favoritesProductIdAtom} from "@/store";
import {User as UserIcon} from "lucide-react";
import {ProfileMenu} from "@/components/layout/header/ProfileMenu";
import {headerMenu} from "@/components/layout/header/header-menu.data";
import {useAtomValue} from "jotai";
import {PAGES} from "@/config/pages.config";

interface HeaderUserMenuProps {
    user?: User | null
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    cartCount: number
}

export const HeaderUserMenu: FC<HeaderUserMenuProps> = ({user, setIsOpen, cartCount}) => {
    const {
        isOpen: isOpenProfileMenu,
        ref: profileMenuRef,
        setIsOpen: setIsOpenProfileMenu,
    } = useOutsideClick<HTMLDivElement>(false);
    const pathname = usePathname();
    const favorites = useAtomValue(favoritesProductIdAtom);

    const isShowFavoritesBadge = favorites.length > 0
    const isShowCartBadge = cartCount !== undefined && cartCount > 0

    return (
        <div className="inline-flex items-center gap-x-8">
            {user ? (
                <div className="relative" ref={profileMenuRef}>
                    <button
                        className={cn(
                            "flex items-center flex-col font-medium opacity-70 hover:opacity-100 transition-opacity",
                            {
                                "font-medium text-foreground opacity-100":
                                    pathname === "/",
                            },
                        )}
                        onClick={() => setIsOpenProfileMenu(!isOpenProfileMenu)}
                    >
                        <UserIcon size={21}/>

                        <span className="font-medium">
                    {user.name || user.email}
                  </span>
                    </button>

                    {isOpenProfileMenu && (
                        <ProfileMenu setIsOpenProfileMenu={setIsOpenProfileMenu}/>
                    )}
                </div>
            ) : (
                <button
                    className={cn(
                        "flex items-center flex-col font-medium opacity-70 hover:opacity-100 transition-opacity",
                        {
                            "font-medium text-foreground opacity-100": pathname === "/",
                        },
                    )}
                    onClick={() => setIsOpen(true)}
                >
                    <UserIcon size={21}/>
                    <span>Войти</span>
                </button>
            )}

            {headerMenu.map((el) => {
                const isActive =
                    pathname === el.link || pathname.startsWith(`${el.link}/`);

                return (
                    <Link
                        className={cn(
                            "inline-flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity relative",
                            {
                                "font-medium text-foreground opacity-100": isActive,
                            },
                        )}
                        key={el.id}
                        href={el.link}
                        aria-current={isActive ? "page" : undefined}
                    >
                        <el.icon size={21}/>
                        <span className="font-medium">{el.title}</span>
                        {
                            ((el.link === PAGES.FAVORITES && isShowFavoritesBadge) || (el.link === PAGES.CART && isShowCartBadge)) && (
                                <span
                                    className="absolute right-1 -top-2 inline-flex h-6 min-w-6 items-center justify-center whitespace-nowrap rounded-full bg-pink-800 px-1.5 text-xs leading-none text-white">
                      {
                          el.link === PAGES.CART ? cartCount : favorites.length
                      }
                      </span>
                            )
                        }
                    </Link>
                );
            })}
        </div>
    );
};