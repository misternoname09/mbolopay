import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";
import * as path from "path";

// Load the .env explicitly
dotenv.config({ path: path.resolve(__dirname, "apps/api/.env") });

export default defineConfig({
  schema: "./apps/api/prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
