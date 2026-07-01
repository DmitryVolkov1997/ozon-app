"use client";
import { useEffect, useRef, useState } from "react";

export const useOutsideClick = <T extends HTMLElement>(initialState: boolean = false) => {
	const ref = useRef<T>(null);
	const [isOpen, setIsOpen] = useState(initialState);

	const handleClick = (e: MouseEvent) => {
		if (!ref.current?.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);

		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	return {
		isOpen,
		setIsOpen,
		ref,
	};
};
