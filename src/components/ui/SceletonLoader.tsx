import cn from "clsx";

interface SkeletonLoaderProps {
	count?: number;
	className?: string;
}

export const SkeletonLoader = ({ count = 1, className }: SkeletonLoaderProps) => {
	return (
		<div>
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className={cn("h-10 bg-gray-200 animate-pulse rounded-full mb-4", className)}
				/>
			))}
		</div>
	);
};
