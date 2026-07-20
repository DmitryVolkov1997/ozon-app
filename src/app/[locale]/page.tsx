import { Header } from "@/components/layout/header/Header";
import { TopMenu } from "@/components/layout/top-menu/TopMenu";
import Image from "next/image";
import { Slider } from "@/pages/home/slider/Slider";
import { ProductItem } from "@/components/elements/product-item/ProductItem";

export default function Home() {
	return (
		<div className="container mx-auto">
			<Header />
			<TopMenu />
			<Image className="mx-auto mt-3" src="/banner.png" alt="banner" width={2400} height={137} />
			<Slider />
			<ProductItem
				product={{
					name: "Кроссовки New Balance 9060",
					id: "1",
					description: "Big a bag",
					price: 10000,
					discountPrice: 5000,
					imageUrl: "https://ir.ozone.ru/s3/multimedia-1-m/wc300/8008106854.jpg",
					createdAt: new Date(),
				}}
			/>
		</div>
	);
}
