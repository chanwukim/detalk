import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const serverEnv = createEnv({
  server: {},
  experimental__runtimeEnv: {
    experimental__runtimeEnv: process.env,
  },
});

export default serverEnv;
