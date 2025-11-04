// Aplicación principal - Actualiza solo los datos, no la UI
class App {
    constructor() {
        this.refreshInterval = null;
        this.autoRefreshEnabled = true;
        this.lastUpdate = null;
        this.init();
    }

    // Inicializar la aplicación
    async init() {
        console.log('[App] Inicializando aplicación...');

        try {
            // Inicializar IndexedDB
            await dbManager.init();
            console.log('[App] Base de datos inicializada');

            // Configurar UI
            this.setupUI();

            // Cargar datos iniciales desde cache
            await this.loadCachedData();

            // Intentar obtener datos frescos del servidor
            await this.refreshData();

            // Configurar auto-refresh
            await this.setupAutoRefresh();

            // Ocultar indicador de carga
            this.hideLoading();

            console.log('[App] Aplicación inicializada correctamente');
        } catch (error) {
            console.error('[App] Error al inicializar:', error);
            this.showError('Error al inicializar la aplicación');
            this.hideLoading();
        }
    }

    // Configurar elementos de UI y event listeners
    setupUI() {
        // Botón de refresh
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                console.log('[App] Refresh manual solicitado');
                this.refreshData();
                this.animateRefreshButton();
            });
        }

        // Listener de cambios de conexión
        window.addEventListener('connectionchange', (event) => {
            this.updateConnectionStatus(event.detail.isOnline);

            // Si recuperamos conexión, refrescar datos
            if (event.detail.isOnline) {
                this.refreshData();
            }
        });

        // Actualizar estado inicial de conexión
        this.updateConnectionStatus(navigator.onLine);

        // Listener para cuando el Service Worker envía mensajes
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'CACHE_CLEARED') {
                    console.log('[App] Cache limpiado por Service Worker');
                    this.updateCacheStatus('Cache limpiado');
                }
            });
        }
    }

    // Cargar datos desde cache (arranque rápido)
    async loadCachedData() {
        try {
            console.log('[App] Cargando datos desde cache...');
            const cachedAppData = await dbManager.getData('appData', 'mainData');

            if (cachedAppData && cachedAppData.data) {
                console.log('[App] Datos encontrados en cache');
                this.renderData(cachedAppData.data);
                this.lastUpdate = new Date(cachedAppData.timestamp);
                this.updateLastUpdateTime();
                this.updateCacheStatus('Usando datos en cache');
            } else {
                console.log('[App] No hay datos en cache');
                this.updateCacheStatus('Sin datos en cache');
            }
        } catch (error) {
            console.error('[App] Error al cargar datos desde cache:', error);
        }
    }

    // Refrescar datos desde el servidor
    async refreshData() {
        try {
            console.log('[App] Obteniendo datos frescos del servidor...');
            this.updateCacheStatus('Actualizando...');

            const response = await apiClient.getAppData();

            if (response && response.data) {
                // Guardar en IndexedDB
                await dbManager.saveData('appData', {
                    id: 'mainData',
                    data: response.data,
                    timestamp: Date.now()
                });

                // Actualizar UI con los nuevos datos
                this.renderData(response.data);

                this.lastUpdate = new Date();
                this.updateLastUpdateTime();
                this.updateCacheStatus('Datos actualizados');

                console.log('[App] Datos actualizados correctamente');
            }
        } catch (error) {
            console.error('[App] Error al refrescar datos:', error);
            this.updateCacheStatus('Error al actualizar - Usando cache');

            // Si hay error, asegurarse de que al menos mostramos datos en cache
            await this.loadCachedData();
        }
    }

    // Renderizar datos en el DOM (solo actualiza contenido, no estructura)
    renderData(data) {
        const container = document.getElementById('dynamic-content');

        if (!container) {
            console.error('[App] Contenedor de contenido dinámico no encontrado');
            return;
        }

        // Construir HTML con los datos
        const html = `
            <div class="data-container">
                <div class="stats-section">
                    <h2>Estadísticas</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value">${data.stats.total}</div>
                            <div class="stat-label">Total</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${data.stats.active}</div>
                            <div class="stat-label">Activos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${data.stats.inactive}</div>
                            <div class="stat-label">Inactivos</div>
                        </div>
                    </div>
                </div>

                <div class="items-section">
                    <h2>Items</h2>
                    <div class="items-list">
                        ${data.items.map(item => `
                            <div class="item-card ${item.status}">
                                <div class="item-header">
                                    <h3>${item.name}</h3>
                                    <span class="item-status">${item.status}</span>
                                </div>
                                <div class="item-body">
                                    <div class="item-value">Valor: ${item.value}</div>
                                    <div class="item-id">ID: ${item.id}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Actualizar el DOM sin recargar toda la página
        container.innerHTML = html;

        console.log('[App] UI actualizada con nuevos datos');
    }

    // Configurar auto-refresh
    async setupAutoRefresh() {
        try {
            const config = await apiClient.getConfig();
            const interval = config.refreshInterval || 30000;

            if (this.autoRefreshEnabled && config.features.autoRefresh) {
                console.log(`[App] Auto-refresh configurado cada ${interval / 1000} segundos`);

                // Limpiar intervalo anterior si existe
                if (this.refreshInterval) {
                    clearInterval(this.refreshInterval);
                }

                // Configurar nuevo intervalo
                this.refreshInterval = setInterval(() => {
                    console.log('[App] Auto-refresh activado');
                    this.refreshData();
                }, interval);
            }
        } catch (error) {
            console.error('[App] Error al configurar auto-refresh:', error);
        }
    }

    // Actualizar indicador de estado de conexión
    updateConnectionStatus(isOnline) {
        const indicator = document.getElementById('status-indicator');
        if (indicator) {
            indicator.className = `status-indicator ${isOnline ? 'online' : 'offline'}`;
            indicator.title = isOnline ? 'En línea' : 'Sin conexión';
        }
    }

    // Actualizar tiempo de última actualización
    updateLastUpdateTime() {
        const lastUpdateEl = document.getElementById('last-update');
        if (lastUpdateEl && this.lastUpdate) {
            const timeStr = this.lastUpdate.toLocaleTimeString('es-ES');
            lastUpdateEl.textContent = `Última actualización: ${timeStr}`;
        }
    }

    // Actualizar estado de cache
    updateCacheStatus(status) {
        const cacheStatusEl = document.getElementById('cache-status');
        if (cacheStatusEl) {
            cacheStatusEl.textContent = `Cache: ${status}`;
        }
    }

    // Animar botón de refresh
    animateRefreshButton() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            const icon = refreshBtn.querySelector('.icon');
            if (icon) {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'spin 0.5s ease-in-out';
                }, 10);
            }
        }
    }

    // Mostrar loading
    showLoading() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.style.display = 'flex';
        }
    }

    // Ocultar loading
    hideLoading() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    // Mostrar error
    showError(message) {
        console.error('[App] Error:', message);
        const container = document.getElementById('dynamic-content');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Error</h3>
                    <p>${message}</p>
                    <button onclick="app.refreshData()">Reintentar</button>
                </div>
            `;
        }
    }

    // Detener auto-refresh
    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
            console.log('[App] Auto-refresh detenido');
        }
    }

    // Limpiar cache y recargar
    async clearCacheAndReload() {
        try {
            console.log('[App] Limpiando cache...');

            // Limpiar IndexedDB
            await dbManager.clearStore('cache');
            await dbManager.clearStore('appData');

            // Limpiar cache del Service Worker
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
            }

            console.log('[App] Cache limpiado, recargando...');
            window.location.reload();
        } catch (error) {
            console.error('[App] Error al limpiar cache:', error);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new App();
    });
} else {
    app = new App();
}

// Exportar para acceso global
window.app = app;

