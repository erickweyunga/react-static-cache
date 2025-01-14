# react-static-cache

A React package for easily caching static assets (images, SVGs, etc.) using service workers.

## Installation

```bash
npm install react-static-cache
# or
yarn add react-static-cache
```

## Usage

1. Wrap your app with the `CacheProvider`:

```tsx
import { CacheProvider } from 'react-static-cache';

const urls = [
  '/images/hero.webp',
  '/images/logo.svg',
  '/assets/background.png'
];

function App() {
  return (
    <CacheProvider 
      urls={urls}
      version="v1" // optional
      cacheName="my-app-cache" // optional
    >
      <YourApp />
    </CacheProvider>
  );
}
```

2. Or use the hook directly for more control:

```tsx
import { useStaticCache } from 'react-static-cache';

function YourComponent() {
  const { isReady, error, registration } = useStaticCache({
    urls: ['/images/hero.webp', '/images/logo.svg'],
    version: 'v1',
  });

  if (error) {
    console.error('Cache error:', error);
  }

  return (
    <div>
      <img src="/images/hero.webp" alt="Hero" />
      {/* Images will be served from cache when available */}
    </div>
  );
}
```

## Features

- 🚀 Simple setup - just provide URLs to cache
- 📦 Automatic cache management
- 🔄 Version control for cache updates
- ⚡ Optimized for static assets
- 🎯 TypeScript support
- 🔒 Secure by default

## API

### CacheProvider

Props:
- `urls: string[]` - List of URLs to cache (required)
- `version?: string` - Cache version (optional)
- `cacheName?: string` - Custom cache name (optional)

### useStaticCache

Parameters:
- `config: CacheConfig` - Configuration object
    - `urls: string[]` - List of URLs to cache
    - `version?: string` - Cache version
    - `cacheName?: string` - Custom cache name

Returns:
- `isReady: boolean` - Whether the service worker is ready
- `error: Error | null` - Any errors that occurred
- `registration: ServiceWorkerRegistration | null` - Service worker registration

## Examples

### Basic Usage

```tsx
import { CacheProvider } from 'react-static-cache';

const urls = [
  '/images/hero.webp',
  '/images/about.jpg',
  '/assets/icons/menu.svg'
];

function App() {
  return (
    <CacheProvider urls={urls}>
      <div>
        <img src="/images/hero.webp" alt="Hero" />
        <img src="/images/about.jpg" alt="About" />
      </div>
    </CacheProvider>
  );
}
```

### With Version Control

```tsx
import { CacheProvider } from 'react-static-cache';

const CACHE_VERSION = 'v1.2.3';

function App() {
  return (
    <CacheProvider 
      urls={['/images/hero.webp']}
      version={CACHE_VERSION}
      cacheName="my-app-images"
    >
      <YourApp />
    </CacheProvider>
  );
}
```

### With Hook

```tsx
import { useStaticCache } from 'react-static-cache';

function ImageGallery() {
  const { isReady, error } = useStaticCache({
    urls: [
      '/gallery/img1.jpg',
      '/gallery/img2.jpg',
      '/gallery/img3.jpg'
    ],
    version: 'gallery-v1'
  });

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src="/gallery/img1.jpg" alt="Gallery 1" />
      <img src="/gallery/img2.jpg" alt="Gallery 2" />
      <img src="/gallery/img3.jpg" alt="Gallery 3" />
    </div>
  );
}
```

## GitHub

[View on GitHub](https://github.com/erickweyunga/react-static-cache.git)

## License

MIT