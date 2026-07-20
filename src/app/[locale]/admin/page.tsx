import { Metadata } from "next";
import { ProductForm } from "./ProductForm";
import { ReviewForm } from "./ReviewForm";
import { ProductList } from "./ProductList";
import { ReviewList } from "./ReviewList";

export const metadata: Metadata = {
	title: "Админ панель",
};

export default function Admin() {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto py-8">
				<h1 className="text-4xl font-semibold mb-8 text-center">Панель администратора</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-15 mb-8 p-4">
					<ProductForm />
					<ReviewForm />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-15 mb-8 p-4">
					<ProductList />
					<ReviewList />
				</div>
			</div>
		</div>
	);
}
