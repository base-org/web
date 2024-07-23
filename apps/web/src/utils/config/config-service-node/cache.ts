import { CacheItem, Parameter } from './types';
import { scopeIdFromString } from './utils';

export default class Cache {
  private cache = new Map<string, CacheItem>();

  private expiration: number;

  constructor(expiration: number) {
    this.expiration = expiration;
  }

  get(key: string): CacheItem | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: Parameter | Parameter[] | null, error?: Error): CacheItem {
    const cachedFailures = this.cache.get(key)?.failureCount ?? 0;
    const failureCount = error ? cachedFailures + 1 : 0;
    // Linear backoff based on the number of times lookup has failed
    const expiration = Date.now() + (this.expiration + this.expiration * failureCount);

    // Check if is scope or
    let isScopeType = false;
    try {
      isScopeType = Boolean(scopeIdFromString(key));
    } catch (e) {
      /* empty */
    }

    const cacheItem = isScopeType
      ? {
          expiration,
          failureCount,
          error: error ?? null,
          data: (value as Parameter[]) ?? null,
        }
      : {
          expiration,
          failureCount,
          error: error ?? null,
          data: (value as Parameter) ?? null,
        };

    this.cache.set(key, cacheItem);

    return cacheItem;
  }
}
