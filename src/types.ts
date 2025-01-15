import { ReactNode } from 'react';

export interface CacheConfig {
    urls: string[];
    version?: string;
    cacheName?: string;
}

export interface CacheProviderProps extends CacheConfig {
    children: ReactNode;
}

export interface UseCacheResult {
    isReady: boolean;
    error: Error | null;
    registration: ServiceWorkerRegistration | null;
}