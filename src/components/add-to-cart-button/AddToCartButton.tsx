"use client"
import React, {FC, useTransition} from 'react';
import {Button} from "@/components/ui/Button";

interface AddToCartButtonProps {
    purchaseProduct: () => Promise<void>
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({purchaseProduct}) => {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => purchaseProduct())
    }

    return (
        <Button
            className="py-1 h-13"
            onClick={handleClick}
            disabled={isPending}
        >
            {isPending ? "Добавление..." : " Добавить в корзину"}
        </Button>
    );
};