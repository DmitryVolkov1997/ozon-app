import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: schema,
	}),
	baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: ["http://localhost:3000", "http://localhost:3001"],
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
