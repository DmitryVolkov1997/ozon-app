"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { product } from "../db/schema";

export async function getAllProducts() {
  try {
    return await db.query.product.findMany({
      with: {
        reviews: true,
      },
    });
  } catch (e) {
    console.error("Database error in getAllProducts:", e);
    throw new Error("Не удалось загрузить список товаров");
  }
}

export async function getProductByIds(ids: string[]) {
  if (ids.length === 0) return [];

  return await db.query.product.findMany({
    where: (product, { inArray }) => inArray(product.id, ids),
    with: {
      reviews: true,
    },
  });
}

export async function getProductById(productId: string) {
  try {
    return await db.query.product.findFirst({
      where: (product, { eq }) => eq(product.id, productId),
      with: {
        reviews: true,
      },
    });
  } catch (error) {
    console.error("Database error in getProductById:", error);
    throw new Error("Не удалось загрузить товар");
  }
}

export async function deleteProduct(id: string) {
  await db.delete(product).where(eq(product.id, id));

  revalidatePath("/admin");
}
