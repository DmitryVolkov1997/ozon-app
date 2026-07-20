import { TypeProduct } from "@/lib/db/types";
import { addCurrency } from "@/utils/add-currency";
import { Circle, Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface ProductItemProps {
	product: TypeProduct;
	reviewAverage?: number;
	reviewCount?: number;
}

export const ProductItem = ({
	product,
	reviewAverage = 4.7,
	reviewCount = 120,
}: ProductItemProps) => {
	const discountPercent = useMemo(() => {
		if (!product.discountPrice) return null;

		return Math.round(((product.price - product.discountPrice) / product.price) * 100);
	}, [product.price, product.discountPrice]);

	return (
		<div className="max-w-2xs rounded-2xl overflow-hidden bg-white shadow">
			<div className="relative">
				<Image
					className="w-full"
					src={product.imageUrl}
					alt={product.name}
					width={280}
					height={180}
					loading="lazy"
					draggable="false"
				/>

				<button className="absolute top-2 right-2">
					<Heart size={25} fill="white" />
				</button>

				{discountPercent && discountPercent >= 50 && (
					<div className="bg-black absolute bottom-2 left-2 flex items-center justify-center gap-x-2 rounded-xl text-white px-2.5 py-1 text-sm font-semibold">
						<Circle size={10} className="fill-pink-600 stroke-pink-600" />
						<span>Вау цены</span>
					</div>
				)}
			</div>

			<div className="p-2">
				<span className="text-amber-500 font-semibold text-xl">
					{addCurrency(Math.round(product.price / 12))} x 12 мес
				</span>

				{product.discountPrice && (
					<div className="flex items-end gap-x-1 font-semibold">
						<span className="text-pink-600">{addCurrency(product.discountPrice)}</span>

						<div className="flex items-baseline gap-x-1">
							<div className="relative inline-block">
								<span className="text-xs text-gray-400">{addCurrency(product.price)}</span>

								<span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-[-5deg] bg-gray-400" />
							</div>

							{discountPercent && (
								<span className="text-pink-500 text-xs">-{discountPercent}%</span>
							)}
						</div>
					</div>
				)}

				<div>{product.name}</div>

				<div className="text-xs font-semibold flex items-center gap-x-1.5">
					<div className="flex items-center gap-x-1">
						<Star className="fill-amber-500 stroke-amber-500" size={13} />
						<span>{reviewAverage}</span>
					</div>

					<div className="flex items-center gap-x-1">
						<MessageCircle className="fill-gray-400 stroke-gray-400" size={13} />
						<span className="text-gray-400">{reviewCount} отзывов</span>
					</div>
				</div>
			</div>
		</div>
	);
};
