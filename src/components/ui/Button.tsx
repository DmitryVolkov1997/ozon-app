"use client";
import cn from "clsx";
import {ComponentPropsWithoutRef, ReactNode} from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    className?: string;
    children: ReactNode;
    variant?: "primary" | "secondary";
};

export const Button = ({
                           className,
                           children,
                           variant = "primary",
                           disabled = false,
                           ...rest
                       }: ButtonProps) => {
    switch (variant) {
        case "primary":
            return (
                <button
                    className={cn(
                        "bg-primary px-4 py-2 rounded-xl font-semibold text-white hover:bg-primary/80 transition-all",
                        className,
                        disabled && "opacity-50 cursor-not-allowed",
                    )}
                    disabled={disabled}
                    {...rest}
                >
                    {children}
                </button>
            );
        case "secondary":
            return (
                <button
                    className={cn(
                        "bg-green-600 px-4 py-2 rounded-xl font-semibold text-white hover:bg-green-600/80 transition-all",
                        className,
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={disabled}
                    {...rest}
                >
                    {children}
                </button>
            );
    }
};
