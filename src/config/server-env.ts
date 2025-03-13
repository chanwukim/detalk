const serverEnv = {
  apiUrl: process.env.SERVER_API_URL as string,
} as const;

export default serverEnv;
