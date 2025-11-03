export class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public errorCode?: string
  ) {
    super(message);
    this.name = 'CustomError';
    Error.captureStackTrace(this, this.constructor);
  }
}
