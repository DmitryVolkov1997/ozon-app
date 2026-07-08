import { useCallback, useEffect } from "react";

export const useEscapeClose = (onClose: () => void, isOpen: boolean) => {
	const handleClose = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		},
		[onClose],
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("keydown", handleClose);
		}

		return () => document.removeEventListener("keydown", handleClose);
	}, [isOpen, handleClose]);
};
