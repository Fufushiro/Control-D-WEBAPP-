                await dbManager.saveToCache(cacheKey, data);
            }

            return data;
        } catch (error) {
            console.error('[API] Error en fetch:', error);

            // Intentar servir desde cache si hay error de red
            const cachedData = await dbManager.getFromCache(cacheKey);
            if (cachedData) {
                console.log('[API] Error de red: Sirviendo desde cache');
                return cachedData;
            }

            throw error;
        }
    }

    // Métodos HTTP específicos
    async get(endpoint, options = {}) {
        return this.fetch(endpoint, { ...options, method: 'GET' });
    }

    async post(endpoint, data, options = {}) {
        return this.fetch(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data, options = {}) {
        return this.fetch(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint, options = {}) {
        return this.fetch(endpoint, { ...options, method: 'DELETE' });
    }

    // Ejemplo: Obtener datos de la aplicación
    async getAppData() {
        try {
            // Reemplaza esto con tu endpoint real
            // Por ahora, simulamos datos
            return this.simulateAPICall({
                status: 'success',
                timestamp: new Date().toISOString(),
                data: {
                    title: 'Control D Web',
                    items: [
                        { id: 1, name: 'Item 1', value: Math.floor(Math.random() * 100), status: 'active' },
                        { id: 2, name: 'Item 2', value: Math.floor(Math.random() * 100), status: 'active' },
                        { id: 3, name: 'Item 3', value: Math.floor(Math.random() * 100), status: 'inactive' },
                        { id: 4, name: 'Item 4', value: Math.floor(Math.random() * 100), status: 'active' }
                    ],
                    stats: {
                        total: 4,
                        active: 3,
                        inactive: 1
                    }
                }
            });

            // Cuando tengas un servidor real, usa esto:
            // return this.get('/api/data');
        } catch (error) {
            console.error('[API] Error obteniendo datos:', error);
            throw error;
        }
    }

    // Simular llamada API (temporal, para demo)
    async simulateAPICall(data, delay = 500) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('[API] Datos simulados obtenidos');
                resolve(data);
            }, delay);
        });
    }

    // Obtener configuración del servidor
    async getConfig() {
        try {
            // Reemplaza con tu endpoint real
            return this.simulateAPICall({
                refreshInterval: 30000, // 30 segundos
                theme: 'light',
                features: {
                    autoRefresh: true,
                    notifications: true
                }
            });

            // return this.get('/api/config');
        } catch (error) {
            console.error('[API] Error obteniendo configuración:', error);
            return {
                refreshInterval: 30000,
                theme: 'light',
                features: {
                    autoRefresh: true,
                    notifications: false
                }
            };
        }
    }

    // Enviar datos al servidor
    async sendData(data) {
        try {
            // Reemplaza con tu endpoint real
            return this.simulateAPICall({
                status: 'success',
                message: 'Datos recibidos correctamente'
            });

            // return this.post('/api/data', data);
        } catch (error) {
            console.error('[API] Error enviando datos:', error);
            throw error;
        }
    }

    // Verificar estado del servidor
    async ping() {
        try {
            // Reemplaza con tu endpoint real
            return this.simulateAPICall({ status: 'ok' }, 100);

            // return this.get('/api/ping');
        } catch (error) {
            return { status: 'error' };
        }
    }
}

// Exportar instancia singleton
const apiClient = new APIClient();
// API Client para manejar todas las peticiones al servidor
class APIClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.isOnline = navigator.onLine;
        this.setupNetworkListeners();
    }

    // Configurar listeners de conexión
    setupNetworkListeners() {
        window.addEventListener('online', () => {
            console.log('[API] Conexión restaurada');
            this.isOnline = true;
            this.notifyConnectionChange(true);
        });

        window.addEventListener('offline', () => {
            console.log('[API] Conexión perdida');
            this.isOnline = false;
            this.notifyConnectionChange(false);
        });
    }

    // Notificar cambios de conexión
    notifyConnectionChange(isOnline) {
        const event = new CustomEvent('connectionchange', {
            detail: { isOnline }
        });
        window.dispatchEvent(event);
    }

    // Fetch genérico con manejo de errores y cache
    async fetch(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const cacheKey = `${options.method || 'GET'}_${url}`;

        // Si estamos offline, intentar servir desde cache
        if (!this.isOnline) {
            console.log('[API] Offline: Buscando en cache para', url);
            const cachedData = await dbManager.getFromCache(cacheKey);

            if (cachedData) {
                console.log('[API] Datos servidos desde cache (offline)');
                return cachedData;
            }

            throw new Error('Sin conexión y sin datos en cache');
        }

        // Configuración por defecto
        const config = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            console.log(`[API] ${config.method} ${url}`);
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Guardar en cache si es un GET exitoso
            if (config.method === 'GET') {

