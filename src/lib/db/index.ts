import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { pathToFileURL } from "node:url";
import * as schema from "./schema";

const client = createClient({
  url: pathToFileURL(`${process.cwd()}/sqlite.db`).href,
});

export const db = drizzle(client, { schema });
