import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

export const securityMiddleware = [
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "images.unsplash.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
      },
    },
  }),
  cors({
    // Security: In production, CORS is disabled (false) unless CORS_ORIGIN is explicitly set
    // In development, wildcard is allowed for convenience
    // Set CORS_ORIGIN environment variable to your specific domain in production
    origin: process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'production' ? false : '*'),
    credentials: true,
  }),
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
];
