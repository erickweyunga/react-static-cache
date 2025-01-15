import {useEffect, useState} from 'react';
import type {CacheConfig, UseCacheResult} from '../types';
import {generateServiceWorkerScript} from '../utils/generateServiceWorker';

export const useStaticCache = (config: CacheConfig): UseCacheResult => {
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            if ('serviceWorker' in navigator) {
                try {
                    // Generate service worker script
                    const swScript = generateServiceWorkerScript(config);
                    const blob = new Blob([swScript], {type: 'text/javascript'});
                    const swUrl = URL.createObjectURL(blob);

                    // Register service worker
                    const reg = await navigator.serviceWorker.register(swUrl, {scope: '/'});
                    setRegistration(reg);
                    setIsReady(true);

                    // Cleanup
                    URL.revokeObjectURL(swUrl);
                } catch (err) {
                    setError(err instanceof Error ? err : new Error('Failed to register service worker'));
                }
            } else {
                setError(new Error('Service workers not supported'));
            }
        };

        initialize().then();
    }, [config]);

    return {isReady, error, registration};
};