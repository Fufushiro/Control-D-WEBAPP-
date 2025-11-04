            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                console.log('[DB] Actualizando estructura de la base de datos');

                // Store para datos de la aplicación
                if (!db.objectStoreNames.contains('appData')) {
                    const appDataStore = db.createObjectStore('appData', { keyPath: 'id' });
                    appDataStore.createIndex('timestamp', 'timestamp', { unique: false });
                    appDataStore.createIndex('type', 'type', { unique: false });
                    console.log('[DB] Store "appData" creado');
                }

                // Store para configuración
                if (!db.objectStoreNames.contains('config')) {
                    db.createObjectStore('config', { keyPath: 'key' });
                    console.log('[DB] Store "config" creado');
                }

                // Store para cache de datos
                if (!db.objectStoreNames.contains('cache')) {
                    const cacheStore = db.createObjectStore('cache', { keyPath: 'url' });
                    cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
                    console.log('[DB] Store "cache" creado');
                }
            };
        });
    }

    // Guardar datos
    async saveData(storeName, data) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);

            // Añadir timestamp si no existe
            if (!data.timestamp) {
                data.timestamp = Date.now();
            }

            const request = store.put(data);

            request.onsuccess = () => {
                console.log(`[DB] Datos guardados en "${storeName}":`, data.id || data.key);
                resolve(request.result);
            };

            request.onerror = () => {
                console.error(`[DB] Error al guardar en "${storeName}":`, request.error);
                reject(request.error);
            };
        });
    }

    // Obtener un dato específico
    async getData(storeName, key) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error(`[DB] Error al obtener dato de "${storeName}":`, request.error);
                reject(request.error);
            };
        });
    }

    // Obtener todos los datos de un store
    async getAllData(storeName) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error(`[DB] Error al obtener todos los datos de "${storeName}":`, request.error);
                reject(request.error);
            };
        });
    }

    // Eliminar un dato
    async deleteData(storeName, key) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => {
                console.log(`[DB] Dato eliminado de "${storeName}":`, key);
                resolve();
            };

            request.onerror = () => {
                console.error(`[DB] Error al eliminar de "${storeName}":`, request.error);
                reject(request.error);
            };
        });
    }

    // Limpiar un store completo
    async clearStore(storeName) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => {
                console.log(`[DB] Store "${storeName}" limpiado`);
                resolve();
            };

            request.onerror = () => {
                console.error(`[DB] Error al limpiar "${storeName}":`, request.error);
                reject(request.error);
            };
        });
    }

    // Guardar en cache con URL como clave
    async saveToCache(url, data) {
        return this.saveData('cache', {
            url: url,
            data: data,
            timestamp: Date.now()
        });
    }

    // Obtener de cache
    async getFromCache(url, maxAge = 5 * 60 * 1000) { // 5 minutos por defecto
        const cached = await this.getData('cache', url);

        if (!cached) return null;

        // Verificar si el cache es muy antiguo
        const age = Date.now() - cached.timestamp;
        if (age > maxAge) {
            console.log('[DB] Cache expirado para:', url);
            await this.deleteData('cache', url);
            return null;
        }

        return cached.data;
    }

    // Guardar configuración
    async saveConfig(key, value) {
        return this.saveData('config', { key, value });
    }

    // Obtener configuración
    async getConfig(key) {
        const config = await this.getData('config', key);
        return config ? config.value : null;
    }
}

// Exportar instancia singleton
const dbManager = new DBManager();
// IndexedDB Manager para almacenar datos localmente
class DBManager {
    constructor(dbName = 'ControlDWebDB', version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    // Inicializar la base de datos
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error('[DB] Error al abrir IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('[DB] IndexedDB inicializada correctamente');
                resolve(this.db);

