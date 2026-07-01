"use client";
import Image from "next/image";
import { LayoutGrid, Search, User } from "lucide-react";
import { headerMenu } from "@/components/layout/header/header-menu.data";
import Link from "next/link";
import cn from "clsx";
import { useTranslations } from "next-intl";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Auth } from "./Auth";
import { useEffect } from "react";

export const Header = () => {
	const t = useTranslations("header");
	const { isOpen, setIsOpen, ref } = useOutsideClick<HTMLFormElement>(false);

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
						<button className="inline-flex flex-col items-center" onClick={() => setIsOpen(true)}>
							<User size={21} />
							<span className="font-medium">Войти</span>
						</button>
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

			{isOpen && <Auth ref={ref} setIsOpen={setIsOpen} />}
		</>
	);
};
