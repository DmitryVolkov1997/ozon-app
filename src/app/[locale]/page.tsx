import { ProductItem } from "@/components/elements/product-item/ProductItem";
import { getAllProducts } from "@/lib/actions/product";
import Slider from "@/pages/home/slider/Slider";
import Image from "next/image";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <>
      <div className="mb-5">
        <Image
          className="mx-auto mt-3"
          src="/banner.png"
          alt="banner"
          width={2400}
          height={137}
        />
        <Slider />
      </div>

      {products.length ? (
        <div className="grid lg:grid-cols-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 justify-items-center">
          {products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <div className="text-gray-400">Товаров пока нет</div>
      )}
    </>
  );
}
