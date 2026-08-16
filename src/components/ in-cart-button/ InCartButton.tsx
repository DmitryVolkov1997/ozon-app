"use client"
import React from 'react';
import {Button} from "@/components/ui/Button";
import {PAGES} from "@/config/pages.config";
import {useRouter} from "@/i18n/navigation";


export const InCartButton = () => {
    const router = useRouter();

    return (
        <Button
            className="py-1 inline-flex flex-col justify-center h-13"
            onClick={() => router.push(PAGES.CART)}
            variant="secondary"
        >
            <span>В корзине</span>
            <span className="font-medium text-sm">Перейти</span>
        </Button>
    );
};