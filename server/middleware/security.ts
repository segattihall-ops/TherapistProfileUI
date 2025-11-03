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
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }),
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
];
