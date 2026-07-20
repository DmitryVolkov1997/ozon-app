import { InferSelectModel } from "drizzle-orm";
import { order, orderItem, product, review } from "./schema";

export type TypeProduct = InferSelectModel<typeof product>;
export type TypeOrder = InferSelectModel<typeof order>;
export type TypeOrderItem = InferSelectModel<typeof orderItem>;
export type TypeReview = InferSelectModel<typeof review>;
