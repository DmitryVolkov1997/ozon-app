import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
	url: "file:./sqlite.db",
});

export const db = drizzle(client);
