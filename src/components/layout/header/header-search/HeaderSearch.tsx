import {Search} from "lucide-react";
import {useTranslations} from "next-intl";
import React, {FC} from 'react';

interface HeaderSearchProps {
    t: ReturnType<typeof useTranslations>;
}

export const HeaderSearch: FC<HeaderSearchProps> = ({t}) => {
    return (
        <div
            className="flex items-center border-2 border-primary rounded-xl focus-within:ring-2 focus-within:ring-primary/30 transition-shadow bg-primary">
            <input
                className="bg-white px-4 py-2 rounded-xl w-full"
                type="search"
                placeholder={t("searchPlaceholder")}
                name="search"
            />

            <button className="bg-primary w-18 flex justify-center">
                <Search color="white"/>
            </button>
        </div>
    );
};