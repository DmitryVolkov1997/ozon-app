"use client";
import Image from "next/image";
import { LayoutGrid, Search, User } from "lucide-react";
import { headerMenu } from "@/components/layout/header/header-menu.data";
import Link from "next/link";
import cn from "clsx";
import { useTranslations } from "next-intl";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { ProfileMenu } from "./ProfileMenu";
import { AuthLogin } from "@/components/auth/AuthLogin";
import { AuthRegister } from "@/components/auth/AuthRegister";

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

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isOpen]);

	return (
		<>
			<header>
				<div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-6 items-center p-3">
					<Image src="/logo.svg" alt="Ozon" width={120} height={60} />

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
							<div className="relative">
								<button
									className="flex items-center flex-col"
									onClick={() => setIsOpenProfileMenu(!isOpenProfileMenu)}
								>
									<User size={21} />

									<span className="font-medium">{data.user.name || data.user.email}</span>
								</button>

								{isOpenProfileMenu && <ProfileMenu ref={profileMenuRef} />}
							</div>
						) : (
							<button className="inline-flex flex-col items-center" onClick={() => setIsOpen(true)}>
								<User size={21} />
								<span className="font-medium">Войти</span>
							</button>
						)}

						{headerMenu.map((el) => (
							<Link
								className={cn(
									"inline-flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity",
								)}
								key={el.id}
								href={el.link}
							>
								<el.icon size={21} />
								<span className="font-medium">{el.title}</span>
							</Link>
						))}
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
				/>
			)}

			{isOpen && authMode === "register" && (
				<AuthRegister
					isPending={isPending}
					authMode="register"
					ref={ref}
					setIsOpen={setIsOpen}
					setAuthMode={setAuthMode}
				/>
			)}

			{/*{isOpen && <Auth ref={ref} setIsOpen={setIsOpen} />}*/}
		</>
	);
};
