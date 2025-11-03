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

export const cacheMiddleware = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
  const key = `cache:${req.originalUrl}`;
  const cached = cacheManager.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  // Store original json method and override to cache response
  // This is intentional monkey-patching for the duration of this request
  const originalJson = res.json.bind(res);
  res.json = function(body: any) {
    cacheManager.set(key, JSON.stringify(body), duration);
    // Restore original method after caching
    res.json = originalJson;
    return originalJson(body);
  };
  
  next();
};
