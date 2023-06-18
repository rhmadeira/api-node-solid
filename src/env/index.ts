import "dotenv/config";
import { z } from "zod";
// z.coerce is used to covert any value to the type specified in the schema
// safeParse ele vai verificar se o valor é valido ou não

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log(_env.error.format());
  throw new Error(_env.error.message);
}

export const env = _env.data;
