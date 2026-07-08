import { PAGES } from "@/config/pages.config";
import { signOut } from "@/lib/auth-client";
import Link from "next/link";
import { RefObject } from "react";

interface ProfileMenuProps {
	ref: RefObject<HTMLDivElement | null>;
}

export const ProfileMenu = ({ ref }: ProfileMenuProps) => {
	const handleLogout = () => {
		signOut();
	};

	return (
		<div
			ref={ref}
			className="fadeIn bg-white shadow-2xl rounded-xl p-4 flex items-center flex-col gap-2 absolute left-1/2 -translate-x-1/2 z-50 top-full min-w-48 w-max"
		>
			<Link className="transition-colors hover:text-primary" href={PAGES.PROFILE}>
				Профиль
			</Link>
			<button className="transition-colors hover:text-primary" onClick={handleLogout}>
				Выйти
			</button>
		</div>
	);
};

// 20:48
