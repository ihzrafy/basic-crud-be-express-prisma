// file-system-cache.d.ts

declare module 'file-system-cache' {
  interface CacheOptions {
    basePath?: string;
    ns?: string;
    hash?: string;
    ttl?: number;
  }

  interface Cache {
    set(key: string, value: any, options?: CacheOptions): Promise<void>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
  }

  function Cache(options?: CacheOptions): Cache;

  export = Cache;
}