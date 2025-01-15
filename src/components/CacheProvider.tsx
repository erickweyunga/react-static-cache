import React from 'react';
import type {CacheProviderProps} from '../types';
import {useStaticCache} from '../hooks/useStaticCache';

export const CacheProvider: React.FC<CacheProviderProps> = (
    {
        children,
        ...config
    }) => {
    useStaticCache(config);
    return <>{children}</>;
};