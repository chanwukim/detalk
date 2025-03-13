const clientEnv = {
  discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL as string,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
} as const;

export default clientEnv;
