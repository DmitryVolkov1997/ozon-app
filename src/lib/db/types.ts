import {InferSelectModel} from "drizzle-orm";
import {User} from "../auth";
import {type cart, type cartItem, order, orderItem, product, review,} from "./schema";

export type TypeProduct = InferSelectModel<typeof product>;
export type TypeOrder = InferSelectModel<typeof order>;
export type TypeOrderItem = InferSelectModel<typeof orderItem>;
export type TypeReview = InferSelectModel<typeof review>;

export type TypeProductWithReviews = TypeProduct & {
    reviews: TypeReview[];
};

export type TypeOrderItemWithProduct = TypeOrderItem & {
    product: TypeProduct
}

export type TypeOrderWithItems = TypeOrder & {
    items: TypeOrderItemWithProduct[];
};

export type TypeFullReview = TypeReview & {
    product: TypeProduct;
    user: User;
};

export type TCart = InferSelectModel<typeof cart>;
export type TCartItem = InferSelectModel<typeof cartItem> & {
    product: TypeProduct;
};

export type TCartFull = {
    items: TCartItem[];
    total: number;
    count: number;
    totalDiscount: number;
};

export type ActionError = {
    success: false;
    error: string;
};