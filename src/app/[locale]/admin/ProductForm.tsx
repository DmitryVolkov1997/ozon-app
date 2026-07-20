"use client";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { createProduct } from "@/lib/actions/admin";
import Image from "next/image";
import { useState } from "react";

export const ProductForm = () => {
	const [imageUrl, setImageUrl] = useState("");

	const onClickCreateProduct = (data: FormData) => {
		createProduct(data);
		setImageUrl("");
	};

	return (
		<form
			action={onClickCreateProduct}
			className="bg-white shadow-sm rounded-2xl p-8 w-full mx-auto space-y-6"
		>
			<div>
				<h3 className="text-2xl font-bold text-slate-800">Добавить товар</h3>
				<p className="text-sm text-slate-500 mt-1">
					Заполните информацию о новом товаре для каталога.
				</p>
			</div>

			<div className="space-y-4">
				<label className="flex flex-col gap-1.5">
					<span
						className="block text-sm font-medium text-slate-700
       mb-1.5"
					>
						Название товара*
					</span>
					<InputField name="name" required />
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="block text-sm font-medium text-slate-700 mb-1.5">Описание</span>
					<textarea
						name="description"
						className="px-4 py-2.5 border border-foreground/15
       focus:border-foreground focus:ring-1 focus:ring-foreground outline-none rounded-xl w-full
       h-32 resize-none transition-all duration-200 placeholder:text-slate-400 text-sm"
					></textarea>
				</label>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<label className="block">
						<span
							className="block text-sm font-medium text-slate-700
       mb-1.5"
						>
							Цена (₸) *
						</span>
						<InputField name="price" type="number" placeholder="0" required min={0} />
					</label>

					<label className="block">
						<span
							className="block text-sm font-medium text-slate-700
       mb-1.5"
						>
							Цена со скидкой (₸)
						</span>
						<InputField
							name="discountPrice"
							type="number"
							placeholder="Оставьте пустым, если скидки нет"
							min={0}
						/>
					</label>
				</div>

				<div className="space-y-2">
					<label className="block">
						<span
							className="block text-sm font-medium text-slate-700
       mb-1.5"
						>
							URL картинки *
						</span>
						<InputField
							name="imageUrl"
							type="url"
							placeholder="http://example.com/image.jpg"
							required
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</label>

					{imageUrl && (
						<div className="mt-2 h-40 overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50 p-2 flex items-center justify-center relative">
							<Image
								src={imageUrl}
								alt="Превью товара"
								className="rounded-lg object-contain"
								onError={(e) => {
									// Если ссылка невалидна, скрываем сломанную картинку
									(e.target as HTMLImageElement).style.display = "none";
								}}
								fill
							/>
						</div>
					)}

					<Button className="w-full" variant="primary" type="submit">
						Добавить товар
					</Button>
				</div>
			</div>
		</form>
	);
};
