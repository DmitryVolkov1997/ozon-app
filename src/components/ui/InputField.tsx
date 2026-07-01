import cn from "clsx";
import { ComponentPropsWithoutRef } from "react";

type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
	className?: string;
};

export const InputField = ({ className, ...props }: InputFieldProps) => {
	return (
		<input
			className={cn(
				"px-4 py-2 border border-foreground/20 focus:border-foreground mb-4 rounded-xl w-full",
				className,
			)}
			{...props}
		/>
	);
};
