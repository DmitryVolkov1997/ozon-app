import { InferSelectModel } from "drizzle-orm";
import { User } from "../auth";
import { order, orderItem, product, review } from "./schema";

export type TypeProduct = InferSelectModel<typeof product>;
export type TypeOrder = InferSelectModel<typeof order>;
export type TypeOrderItem = InferSelectModel<typeof orderItem>;
export type TypeReview = InferSelectModel<typeof review>;

export type TypeProductWithReviews = TypeProduct & {
  reviews: TypeReview[];
};

export type TypeOrderWithItems = TypeOrder & {
  items: TypeOrderItem[];
};

export type TypeFullReview = TypeReview & {
  product: TypeProduct;
  user: User;
};
