"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { product, review } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createProduct(data: FormData) {
	const name = data.get("name") as string;
	const description = data.get("description") as string;
	const price = data.get("price") as string;
	const discountPrice = data.get("discountPrice")
		? parseInt(data.get("discountPrice") as string)
		: null;
	const imageUrl = data.get("imageUrl") as string;

	const priceNumber = Number(price);
	const discountPriceNumber = discountPrice == null ? null : Number(discountPrice);

	if (!Number.isInteger(priceNumber)) {
		throw new Error("price должен быть целым числом");
	}

	if (discountPriceNumber !== null && !Number.isInteger(discountPriceNumber)) {
		throw new Error("discountPrice должен быть целым числом");
	}

	await db.insert(product).values({
		id: crypto.randomUUID(),
		name,
		description: description || null,
		price: priceNumber,
		discountPrice: discountPriceNumber,
		imageUrl,
	});

	revalidatePath("/admin");
	// return { success: true };
}

export async function getAllProducts() {
	return await db.select().from(product);
}

export async function deleteProduct(id: string) {
	await db.delete(product).where(eq(product.id, id));

	revalidatePath("/admin");
	// return { success: true };
}

//=== ОТЗЫВЫ ===

export async function createReview(data: FormData) {
	const productId = data.get("productId");
	const userId = data.get("userId");
	const ratingValue = data.get("rating");
	const commentValue = data.get("comment");

	if (
		typeof productId !== "string" ||
		typeof userId !== "string" ||
		typeof ratingValue !== "string"
	) {
		throw new Error("Не все обязательные поля заполнены");
	}

	const rating = Number(ratingValue);

	if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
		throw new Error("Оценка должна быть числом от 1 до 5");
	}

	await db.insert(review).values({
		id: crypto.randomUUID(),
		productId,
		userId,
		rating,
		comment: typeof commentValue === "string" ? commentValue || null : null,
	});

	revalidatePath(`/admin`);
	// return { success: true };
}

export async function deleteReview(id: string) {
	await db.delete(review).where(eq(review.id, id));

	revalidatePath("/admin");
	// return { success: true };
}

export async function getAllReviews() {
	return await db.select().from(review);
}
