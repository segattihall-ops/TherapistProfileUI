import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/errors.ts';
import { logger } from '../utils/logger.ts';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error('Error occurred:', err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message });
}
