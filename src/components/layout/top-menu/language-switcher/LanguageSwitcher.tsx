'use client'
import {useMemo, useState} from "react";
import {LANGUAGES} from "@/components/layout/top-menu/language-switcher/languages.data";

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<'ru' | 'en'>('ru')

    const language = useMemo(() => {
        return LANGUAGES.find((language) => language.code === currentLanguage)
    }, [currentLanguage])

    return (
        <button
            className='text-xl flex items-center gap-x-1 bg-gray-100 hover:bg-gray-200 transition-all rounded-md px-1 w-13'
            type='button' onClick={() => setCurrentLanguage(prev => prev === 'ru' ? 'en' : 'ru')}>
            <span>{language?.flag}</span>
            <span className='uppercase font-medium opacity-50 text-sm'>{language?.code}</span>
        </button>
    );
};

export default LanguageSwitcher;