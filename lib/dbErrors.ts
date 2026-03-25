/**
 * Shared helpers for MongoDB / Mongoose connection failures in API routes.
 */
export class DatabaseUnavailableError extends Error {
  constructor(message = 'Database unavailable') {
    super(message);
    this.name = 'DatabaseUnavailableError';
  }
}

export function isDatabaseConnectionError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const e = error as { name?: string; message?: string; code?: string | number };
  if (
    e.name === 'MongooseServerSelectionError' ||
    e.name === 'MongoServerSelectionError' ||
    e.name === 'MongoNetworkError'
  ) {
    return true;
  }
  const msg = String(e.message || '');
  if (msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND') || msg.includes('ETIMEDOUT')) {
    return true;
  }
  if (e.code === 'ECONNREFUSED' || e.code === 'ENOTFOUND') return true;
  return false;
}

export function isMongooseCastError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  return (error as { name?: string }).name === 'CastError';
}
