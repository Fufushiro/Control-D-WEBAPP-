// Service Worker para cachear archivos estáticos y manejar requests
const CACHE_NAME = 'controldweb-v1';
const DYNAMIC_CACHE = 'controldweb-dynamic-v1';

// Archivos estáticos que se cachearán en la instalación
const STATIC_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './api-client.js',
    './db-manager.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Service Worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Cacheando archivos estáticos');
                // Cachear archivos que existen
                return cache.addAll(STATIC_ASSETS.filter(asset => {
                    // Solo cachear archivos críticos
                    return !asset.includes('icon-') || asset === './';
                }).concat(['./index.html', './styles.css', './app.js', './api-client.js', './db-manager.js']));
            })
            .then(() => self.skipWaiting()) // Activar inmediatamente
            .catch(err => console.error('[SW] Error al cachear:', err))
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activando Service Worker...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Eliminar caches antiguas
                    if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
                        console.log('[SW] Eliminando cache antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Tomar control inmediatamente
    );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Estrategia: Cache First para archivos estáticos
    if (isStaticAsset(url.pathname)) {
        event.respondWith(cacheFirst(request));
    }
    // Estrategia: Network First para datos de API
    else if (isApiRequest(url.pathname)) {
        event.respondWith(networkFirst(request));
    }
    // Por defecto: Cache First
    else {
        event.respondWith(cacheFirst(request));
    }
});

// Verificar si es un archivo estático
function isStaticAsset(pathname) {
    const staticExtensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.json'];
    return staticExtensions.some(ext => pathname.endsWith(ext)) || pathname === '/' || pathname === './';
}

// Verificar si es una request de API
function isApiRequest(pathname) {
    return pathname.includes('/api/') || pathname.includes('/data/');
}

// Estrategia Cache First: Buscar en cache primero, luego en red
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        console.log('[SW] Sirviendo desde cache:', request.url);
        return cachedResponse;
    }

    try {
        console.log('[SW] No encontrado en cache, obteniendo de red:', request.url);
        const networkResponse = await fetch(request);

        // Cachear la respuesta para futuras requests
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Error al obtener de red:', error);

        // Si falla, intentar servir index.html para SPA
        if (request.mode === 'navigate') {
            return caches.match('./index.html');
        }

        throw error;
    }
}

// Estrategia Network First: Intentar red primero, luego cache
async function networkFirst(request) {
    try {
        console.log('[SW] Obteniendo datos de red:', request.url);
        const networkResponse = await fetch(request);

        // Cachear respuesta exitosa
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Error de red, buscando en cache:', request.url);
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}

// Escuchar mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            }).then(() => {
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => client.postMessage({ type: 'CACHE_CLEARED' }));
                });
            })
        );
    }
});

