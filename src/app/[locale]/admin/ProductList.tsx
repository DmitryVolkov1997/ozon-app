import { deleteProduct, getAllProducts } from "@/lib/actions/admin";
import { addCurrency } from "@/utils/add-currency";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export async function ProductList() {
	const products = (await getAllProducts()) || [];

	return (
		<div className="mx-auto space-y-6">
			<h3 className="text-2xl font-bold text-slate-800 mb-4">Список товаров ({products.length})</h3>

			{products.length ? (
				products.map((product) => {
					const deleteProductWithId = deleteProduct.bind(null, product.id);

					return (
						<div
							className="bg-white shadow-sm rounded-2xl p-8 w-full flex items-center gap-x-4"
							key={product.id}
						>
							<Image src={product.imageUrl} alt={product.name} width={100} height={100} />

							<div className="flex flex-col">
								<p className="mb-2 font-semibold">{product.name}</p>
								<span className=" text-gray-400">{addCurrency(product.price)}</span>
							</div>

							<form action={deleteProductWithId}>
								<button className="bg-transparent" type="submit">
									<Trash2 className="text-red-700 hover:text-red-900 transition-colors" size={20} />
								</button>
							</form>
						</div>
					);
				})
			) : (
				<div className="text-gray-400">Товаров пока нет</div>
			)}
		</div>
	);
}
