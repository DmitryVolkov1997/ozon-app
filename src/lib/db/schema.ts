import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: int("id").primaryKey({ autoIncrement: true }),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	name: text("name"),
	createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const sessions = sqliteTable("sessions", {
	id: int("id").primaryKey({ autoIncrement: true }),
	userId: int("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expiresAt: text("expires_at").notNull(),
});

export const reviews = sqliteTable("reviews", {
	id: int("id").primaryKey({ autoIncrement: true }),
	userId: int("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	productId: int("product_id")
		.notNull()
		.references(() => products.id, { onDelete: "cascade" }),
	rating: real("rating").notNull(),
	comment: text("comment"),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});

export const products = sqliteTable("products", {
	id: int("id").primaryKey({ autoIncrement: true }),

	name: text("name").notNull(),
	description: text("description"),
	price: integer("price").notNull(),
	discountPrice: integer("discount_price"),
	imageUrl: text("image_url").notNull(),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});

export const orders = sqliteTable("orders", {
	id: int("id").primaryKey({ autoIncrement: true }),

	userId: int("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	total: integer("total").notNull(),
	status: text("status").notNull().default("pending"),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});

export const orderItems = sqliteTable("order_items", {
	id: int("id").primaryKey({ autoIncrement: true }),

	orderId: int("order_id")
		.notNull()
		.references(() => orders.id, { onDelete: "cascade" }),
	productId: int("product_id")
		.notNull()
		.references(() => products.id, { onDelete: "cascade" }),
	quantity: integer("quantity").notNull().default(1),
	price: integer("price").notNull(),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});
