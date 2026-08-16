import { deleteProduct, getAllProducts } from "@/lib/actions/product";
import { addCurrency } from "@/utils/add-currency";
import Image from "next/image";
import DeleteProductButton from "./DeleteProductButton";

export async function ProductList() {
  const products = (await getAllProducts()) || [];

  return (
    <div className="mx-auto space-y-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Список товаров ({products.length})
      </h3>

      {products.length ? (
        products.map((product) => {
          const deleteProductWithId = deleteProduct.bind(null, product.id);

          return (
            <div
              className="bg-white shadow-sm rounded-2xl p-8 w-full flex items-center gap-x-4"
              key={product.id}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={100}
                height={100}
                className="object-contain"
              />

              <div className="flex flex-col">
                <p className="mb-2 font-semibold">{product.name}</p>
                <span className=" text-gray-400">
                  {addCurrency(product.price)}
                </span>
              </div>

              <DeleteProductButton
                action={deleteProductWithId}
                productId={product.id}
              />
            </div>
          );
        })
      ) : (
        <div className="text-gray-400">Товаров пока нет</div>
      )}
    </div>
  );
}
