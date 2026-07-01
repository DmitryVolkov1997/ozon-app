export class PagesConfig {
	HOME = "/";
	ORDERS = "/orders";
	FAVORITES = "/favorites";
	CART = "/cart";

	PRODUCT_DETAILS(slug: string) {
		return `/product/${slug}`;
	}

	FRESH = "/fresh";
	OZON_CARD = "/ozon-card";
	AIR_TICKETS = "/air-tickets";
	FOR_BUSINESS = "/for-business";
	CLOTHING = "/clothing";
	ELECTRONICS = "/electronics";
	HOME_AND_GARDEN = "/home-and-garden";
	PRODUCTS_FOR_1_RUB = "/products-for-1-rub";
	CERTIFICATES = "/certificates";
}

export const PAGES = new PagesConfig();
