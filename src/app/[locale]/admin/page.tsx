import { Metadata } from "next";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";

export const metadata: Metadata = {
  title: "Админ панель",
};

export default function Admin() {
  return (
    <div className="min-h-screen mt-5">
      <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm mb-6 text-center">
        Панель администратора
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 mb-8 p-4">
        <ProductForm />
        <ReviewForm />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 mb-8 p-4">
        <ProductList />
        <ReviewList />
      </div>
    </div>
  );
}
