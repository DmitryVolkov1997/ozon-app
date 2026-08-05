"use server";
import { db } from "../db";

export async function getProductByIds(ids: string[]) {
  if (ids.length === 0) return [];

  return await db.query.product.findMany({
    where: (product, { inArray }) => inArray(product.id, ids),
    with: {
      reviews: true,
    },
  });
}
