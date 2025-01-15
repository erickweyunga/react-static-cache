export const inspectCache = async (cacheName?: string) => {
    try {
        // If no cache name provided, list all caches
        if (!cacheName) {
            const cacheNames = await caches.keys();
            const allCaches: Record<string, string[]> = {};

            for (const name of cacheNames) {
                const cache = await caches.open(name);
                const keys = await cache.keys();
                allCaches[name] = keys.map(key => key.url);
            }

            console.group('All Cached Assets:');
            Object.entries(allCaches).forEach(([name, urls]) => {
                console.group(`Cache: ${name}`);
                urls.forEach(url => console.log('- ' + url));
                console.groupEnd();
            });
            console.groupEnd();

            return allCaches;
        }

        // If cache name provided, show specific cache
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        const urls = keys.map(key => key.url);

        console.group(`Cache Contents (${cacheName}):`);
        urls.forEach(url => console.log('- ' + url));
        console.groupEnd();

        return {[cacheName]: urls};
    } catch (error) {
        console.error('Error inspecting cache:', error);
        return null;
    }
};

export const clearCache = async (cacheName?: string) => {
    try {
        if (cacheName) {
            await caches.delete(cacheName);
            console.log(`Cleared cache: ${cacheName}`);
        } else {
            const keys = await caches.keys();
            await Promise.all(keys.map(key => caches.delete(key)));
            console.log('Cleared all caches');
        }
        return true;
    } catch (error) {
        console.error('Error clearing cache:', error);
        return false;
    }
};