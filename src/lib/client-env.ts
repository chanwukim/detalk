import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

export default clientEnv;