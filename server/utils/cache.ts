import type { Request, Response, NextFunction } from 'express';

// Simple in-memory cache manager
class CacheManager {
  private cache: Map<string, { value: string; expiry: number }> = new Map();

  get(key: string): string | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  set(key: string, value: string, duration: number): void {
    this.cache.set(key, {
      value,
      expiry: Date.now() + duration * 1000,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheManager = new CacheManager();

export function cache(seconds: number) {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.set('Cache-Control', `public, max-age=${seconds}`);
    next();
  };
}

export const cacheMiddleware = (duration: number) => async (req: Request, res: Response, next: NextFunction) => {
  const key = `cache:${req.originalUrl}`;
  const cached = await cacheManager.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const originalJson = res.json;
  res.json = function(body: any) {
    cacheManager.set(key, JSON.stringify(body), duration);
    return originalJson.call(this, body);
  };
  
  next();
};
