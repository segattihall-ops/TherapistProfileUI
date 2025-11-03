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
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.errorCode,
    });
  }

  // Production vs Development error responses
  const isProduction = process.env.NODE_ENV === 'production';
  res.status(500).json({
    status: 'error',
    message: isProduction ? 'Internal server error' : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
