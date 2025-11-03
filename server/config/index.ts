import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().optional(),
  CORS_ORIGIN: z.string().optional(),
  CACHE_TTL: z.coerce.number().default(300),
  SESSION_SECRET: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const config = {
  port: parsedEnv.PORT,
  nodeEnv: parsedEnv.NODE_ENV,
  isDevelopment: parsedEnv.NODE_ENV === 'development',
  isProduction: parsedEnv.NODE_ENV === 'production',
  databaseUrl: parsedEnv.DATABASE_URL,
  corsOrigin: parsedEnv.CORS_ORIGIN,
  cacheTTL: parsedEnv.CACHE_TTL,
  sessionSecret: parsedEnv.SESSION_SECRET,
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  jsonLimit: '10mb',
};
