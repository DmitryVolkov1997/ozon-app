"use client";
import { AuthLogin } from "@/components/auth/AuthLogin";
import { AuthRegister } from "@/components/auth/AuthRegister";
import { headerMenu } from "@/components/layout/header/header-menu.data";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Link, usePathname } from "@/i18n/navigation";
import { useSession } from "@/lib/auth-client";
import { favoritesProductIdAtom } from "@/store";
import cn from "clsx";
import { useAtom } from "jotai";
import { LayoutGrid, Search, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
  const t = useTranslations("header");
  const { isOpen, setIsOpen, ref } = useOutsideClick<HTMLFormElement>(false);
  const { data, isPending } = useSession();
  const {
    isOpen: isOpenProfileMenu,
    ref: profileMenuRef,
    setIsOpen: setIsOpenProfileMenu,
  } = useOutsideClick<HTMLDivElement>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const pathname = usePathname();
  const [favorites] = useAtom(favoritesProductIdAtom);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    if (data?.user) {
      setIsOpen(false);
    }
  }, [data, setIsOpen]);

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

          <button className="bg-primary text-white rounded-md p-2 flex items-center gap-2 hover:bg-primary/90">
            <LayoutGrid />

            <span>{t("catalogTitle")}</span>
          </button>

          <div className="flex items-center border-2 border-primary rounded-xl focus-within:ring-2 focus-within:ring-primary/30 transition-shadow bg-primary">
            <input
              className="bg-white px-4 py-2 rounded-xl w-full"
              type="search"
              placeholder={t("searchPlaceholder")}
              name="search"
            />

            <button className="bg-primary w-18 flex justify-center">
              <Search color="white" />
            </button>
          </div>

          <div className="inline-flex items-center gap-x-8">
            {data?.user ? (
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
                  <User size={21} />

                  <span className="font-medium">
                    {data.user.name || data.user.email}
                  </span>
                </button>

                {isOpenProfileMenu && (
                  <ProfileMenu setIsOpenProfileMenu={setIsOpenProfileMenu} />
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
                <User size={21} />
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
                  <el.icon size={21} />
                  <span className="font-medium">{el.title}</span>
                  {favorites &&
                    favorites.length > 0 &&
                    el.title === "Избранное" && (
                      <span className="absolute right-1 -top-2 inline-flex h-6 min-w-6 items-center justify-center whitespace-nowrap rounded-full bg-pink-800 px-1.5 text-xs leading-none text-white">
                        {favorites.length}
                      </span>
                    )}
                </Link>
              );
            })}
          </div>
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
