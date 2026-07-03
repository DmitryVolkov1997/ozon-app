import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
	name: text("name"),
	createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const account = sqliteTable("accounts", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const session = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expiresAt: text("expires_at").notNull(),
	token: text("token").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
	userAgent: text("user_agent"),
	ipAddress: text("ip_address"),
});

export const review = sqliteTable("reviews", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	productId: text("product_id")
		.notNull()
		.references(() => product.id, { onDelete: "cascade" }),
	rating: real("rating").notNull(),
	comment: text("comment"),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});

export const product = sqliteTable("products", {
	id: text("id").primaryKey(),

	name: text("name").notNull(),
	description: text("description"),
	price: integer("price").notNull(),
	discountPrice: integer("discount_price"),
	imageUrl: text("image_url").notNull(),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});

export const order = sqliteTable("orders", {
	id: text("id").primaryKey(),

	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	total: integer("total").notNull(),
	status: text("status").notNull().default("pending"),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});

export const orderItem = sqliteTable("order_items", {
	id: text("id").primaryKey(),

	orderId: text("order_id")
		.notNull()
		.references(() => order.id, { onDelete: "cascade" }),
	productId: text("product_id")
		.notNull()
		.references(() => product.id, { onDelete: "cascade" }),
	quantity: integer("quantity").notNull().default(1),
	price: integer("price").notNull(),
	createdAt: integer("created_at", {
		mode: "timestamp",
	}).$defaultFn(() => new Date()),
});
