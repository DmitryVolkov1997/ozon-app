import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { createReview, getAllProducts } from "@/lib/actions/admin";

export const ReviewForm = async () => {
	const products = await getAllProducts();

	return (
		<form
			action={createReview}
			className="bg-white shadow-sm rounded-2xl p-8 w-full mx-auto space-y-6 flex flex-col"
		>
			<div>
				<h3 className="text-2xl font-bold text-slate-800">Добавить отзыв</h3>
			</div>

			<div className="space-y-4 grow">
				<label className="flex flex-col gap-1.5">
					<span
						className="block text-sm font-medium text-slate-700
       mb-1.5"
					>
						User ID*
					</span>
					<InputField name="userId" required />
				</label>

				<select
					className="px-4 py-2 border border-foreground/20 focus:border-foreground mb-4 rounded-xl w-full "
					name="productId"
					required
				>
					<option value="">Выберите товар</option>

					{products.map((product) => (
						<option className="text-wrap" key={product.id} value={product.id}>
							{product.name}
						</option>
					))}
				</select>

				<label className="flex flex-col gap-1.5">
					<span
						className="block text-sm font-medium text-slate-700
       mb-1.5"
					>
						Рейтинг (1-5)
					</span>
					<InputField name="rating" type="number" min={1} max={5} step={1} required />
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="block text-sm font-medium text-slate-700 mb-1.5">Комментарий</span>
					<textarea
						name="comment"
						className="px-4 py-2.5 border border-foreground/15
       focus:border-foreground focus:ring-1 focus:ring-foreground outline-none rounded-xl w-full
       h-32 resize-none transition-all duration-200 placeholder:text-slate-400 text-sm"
					></textarea>
				</label>
			</div>
			<Button className="w-full" variant="primary" type="submit">
				Добавить отзыв
			</Button>
		</form>
	);
};
