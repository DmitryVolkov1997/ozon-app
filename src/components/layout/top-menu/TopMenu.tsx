import {topMenu} from "@/components/layout/top-menu/top-menu.data";
import Link from "next/link";
import cn from "clsx";
import LanguageSwitcher from "@/components/layout/top-menu/language-switcher/LanguageSwitcher";
import {Dot} from "lucide-react";

export const TopMenu = () => {
    return (
        <div className='mt-5 flex flex-wrap items-center justify-between gap-x-5'>
            <nav className='flex gap-5'>
                {topMenu.map((menuItem, index) => (
                    <Link
                        className={cn('flex gap-2 items-center opacity-70 hover:opacity-100 transition-opacity', {
                            'opacity-100 text-teal-600': index === 0
                        })}
                        key={menuItem.id}
                        href={menuItem.href}>
                        {menuItem.icon && (
                            <menuItem.icon size={16}/>
                        )}

                        <span className="whitespace-nowrap">
                        {menuItem.title}
                    </span>
                    </Link>
                ))}
            </nav>

            <div className='flex items-center gap-x-3'>
                <div className='font-medium flex items-center whitespace-nowrap'>
                    <span
                        className='opacity-60 hover:opacity-100 transition-opacity'>Караганда</span>
                    <Dot/>
                    <button className='text-primary font-semibold'>Укажите адрес</button>
                </div>

                <div>
                    <LanguageSwitcher/>
                </div>
            </div>

        </div>

    );
};

