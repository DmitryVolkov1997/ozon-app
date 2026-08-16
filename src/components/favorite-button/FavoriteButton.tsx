"use client"
import React, {FC} from 'react';
import {Heart} from "lucide-react";
import {useFavorites} from "@/hooks/useFavorites";
import {TypeProduct} from "@/lib/db/types";

interface FavoriteButtonProps {
    product: TypeProduct
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({product}) => {
    const {isFavorite, toggleFavorite} = useFavorites(product);

    return (
        <button
            className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-3"
            onClick={toggleFavorite}
            aria-label="Добавить в избранное"
        >
            <Heart
                className="transition-colors"
                size={25}
                stroke={isFavorite ? "red" : "var(--color-primary)"}
            />
        </button>
    );
};