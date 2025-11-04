# ControlD WebApp v1.0.5

Aplicación Android nativa desarrollada en Kotlin que proporciona una experiencia de navegación completa para el servicio web de ControlD (https://controld.com/) mediante un WebView optimizado, incluyendo una **Progressive Web App (PWA)** integrada con capacidades offline.

## 📱 Descripción de la Aplicación

Esta aplicación funciona como un contenedor nativo (WebView wrapper) para el sitio web de ControlD, permitiendo a los usuarios acceder a todos los servicios de ControlD directamente desde una app Android sin necesidad de usar un navegador web tradicional.

### ¿Qué es ControlD?

ControlD es un servicio de DNS personalizable que permite controlar y filtrar el tráfico de internet, bloqueando anuncios, rastreadores, malware y contenido no deseado a nivel de DNS.

## 🆕 Novedades en v1.0.5

### 🌐 Progressive Web App (PWA) Integrada
La aplicación ahora incluye una **webapp moderna con arquitectura PWA** ubicada en `app/src/main/assets/`:

#### **Service Worker** (`service-worker.js`)
- ✅ **Caché inteligente** con dos estrategias:
  - **Cache First**: Para recursos estáticos (HTML, CSS, JS, imágenes)
  - **Network First**: Para datos de API con fallback a caché offline
- ✅ **Funcionamiento offline**: La app puede funcionar sin conexión usando datos cacheados
- ✅ **Actualización automática** de recursos cuando hay conexión
- ✅ **Gestión dinámica de caché** para optimizar espacio de almacenamiento

#### **Base de Datos Local** (`db-manager.js`)
- ✅ **IndexedDB** para almacenamiento estructurado y persistente
- ✅ **Object Stores**:
  - `appData`: Datos de la aplicación y configuraciones
  - `userSettings`: Preferencias del usuario
  - `cache`: Caché de respuestas de API
- ✅ **Operaciones CRUD** completas (Create, Read, Update, Delete)
- ✅ **Búsquedas por índices** para consultas rápidas

#### **Cliente API** (`api-client.js`)
- ✅ **Integración con backend** ControlD
- ✅ **Manejo automático de errores** y reintentos
- ✅ **Gestión de autenticación** y tokens
- ✅ **Sincronización de datos** bidireccional

#### **Interfaz de Usuario** (`index.html` + `styles.css` + `app.js`)
- ✅ **UI moderna y responsiva** con Material Design
- ✅ **Indicador de estado de conexión** (online/offline)
- ✅ **Spinner de carga** para feedback visual
- ✅ **Actualización dinámica de contenido** sin recargar la página
- ✅ **Header y footer fijos** con contenido dinámico en el centro
- ✅ **Tema personalizado** con colores de marca

#### **Configuración PWA** (`manifest.json`)
- ✅ **Instalable** como aplicación web en dispositivos compatibles
- ✅ **Iconos adaptativos** en múltiples resoluciones
- ✅ **Display standalone** para experiencia app-like
- ✅ **Theme color** personalizado

### 🔒 Seguridad Mejorada
- ✅ **Keystore protegido**: Los archivos `.jks` y credenciales ya no se suben al repositorio
- ✅ **Gitignore actualizado**: Protección completa de archivos sensibles
- ✅ **Local.properties seguro**: Configuración de firma desde archivo local no versionado
- ✅ **Historial limpio**: Eliminación completa de archivos sensibles del historial de Git

### 📦 Build System Mejorado
- ✅ **Configuración de firma automática** desde `local.properties`
- ✅ **Builds de release firmados** configurables
- ✅ **Scripts de verificación** incluidos (`verify-setup.sh`, `quick.sh`)

## ✨ Características Principales

### 🌐 WebView Completo y Moderno
La aplicación implementa un WebView Android con todas las funcionalidades necesarias para una experiencia web completa:

- **JavaScript Habilitado**: Permite la ejecución de código JavaScript necesario para el funcionamiento completo del sitio
- **DOM Storage**: Almacenamiento local (localStorage y sessionStorage) para guardar preferencias y datos de sesión
- **Base de Datos Web**: Soporte para almacenamiento persistente de datos con IndexedDB
- **Cookies Completas**: Gestión de cookies de primera y tercera parte para mantener sesiones de usuario
- **Modo de Caché Inteligente**: Utiliza caché cuando está disponible para mejorar el rendimiento
- **Viewport Adaptable**: Ajusta automáticamente el contenido al tamaño de la pantalla
- **Aceleración por Hardware**: Mejora el rendimiento de renderizado y animaciones

### 🚀 Capacidades PWA (Progressive Web App)

#### **Funcionamiento Offline**
- La webapp puede funcionar **sin conexión a internet** usando datos cacheados
- Service Worker mantiene recursos estáticos en caché
- Fallback automático a datos locales cuando no hay red
- Sincronización automática cuando se recupera la conexión

#### **Almacenamiento Persistente**
- **IndexedDB**: Base de datos local estructurada con múltiples stores
- **LocalStorage**: Para preferencias simples y configuración
- **Service Worker Cache**: Para recursos estáticos y respuestas de API
- **Capacidad**: Varios MB de datos offline disponibles

#### **Rendimiento Optimizado**
- Carga inicial rápida con assets cacheados
- Estrategias de caché inteligentes (Cache First / Network First)
- Actualización en segundo plano de recursos
- Compresión y minimización de recursos

### 🔐 Gestión de Sesión y Autenticación

- Soporte completo para login y autenticación en ControlD
- Las cookies de sesión se mantienen entre aperturas de la app
- Restauración automática del estado de navegación tras rotación de pantalla
- Los datos de sesión persisten durante el uso de la aplicación
- **Tokens de autenticación** gestionados por el cliente API
- **Renovación automática** de sesiones expiradas

### 📱 Navegación Intuitiva

- **Botón Atrás**: El botón de retroceso del dispositivo navega hacia atrás en el historial del WebView
- **Historial de Navegación**: Mantiene un historial completo de las páginas visitadas dentro de la app
- **Indicador de Carga**: Barra de progreso circular mientras se cargan las páginas
- **Pantalla Completa**: Experiencia inmersiva sin barras de navegación del navegador
- **Estado de Conexión**: Indicador visual (online/offline) en tiempo real
- **Botón de Actualización**: Refresh manual de datos del servidor

### 🎨 Interfaz de Usuario Moderna

- **Material Design**: Componentes modernos siguiendo guías de Google
- **UI Responsiva**: Adaptación automática a diferentes tamaños de pantalla
- **Tema Personalizado**: Colores coherentes con la marca ControlD
- **Animaciones Suaves**: Transiciones fluidas entre estados
- **Loading States**: Feedback visual durante operaciones asíncronas
- **Header Fijo**: Navegación siempre accesible
- **Footer Informativo**: Información de versión y estado

### 🔒 Seguridad y Privacidad

- **Acceso a Archivos Deshabilitado**: Previene acceso no autorizado al sistema de archivos local
- **Control de Reproducción de Media**: Requiere interacción del usuario para reproducir contenido multimedia
- **Modo de Contenido Mixto**: Configurado para compatibilidad segura entre HTTP/HTTPS
- **Permisos Mínimos**: Solo solicita permiso de INTERNET

### 🎨 Interfaz de Usuario

- Tema personalizado coherente con Material Design
- Sin elementos de navegación superfluos - experiencia web pura
- Diseño responsivo que se adapta a diferentes tamaños de pantalla
- Configuración que preserva la orientación y estado del teclado

## 🛠️ Tecnologías y Componentes

### Lenguaje y Framework
- **Kotlin**: Lenguaje de programación moderno para Android
- **AndroidX**: Bibliotecas de compatibilidad modernas
- **Material Design**: Componentes de diseño de Google

### 🌐 Webapp PWA (Assets)

La aplicación incluye una **Progressive Web App completa** en `app/src/main/assets/`:

#### **service-worker.js**
Service Worker con estrategias de caché avanzadas:
```javascript
// Estrategias implementadas:
- Cache First: Para recursos estáticos (HTML, CSS, JS, imágenes)
- Network First: Para datos de API con fallback offline
- Caché dinámico: Actualización automática de recursos
```

**Características**:
- Interceptación de requests HTTP/HTTPS
- Gestión de caché con dos niveles (estático + dinámico)
- Detección automática de tipo de recurso (API vs estático)
- Manejo de errores y fallbacks

#### **db-manager.js**
Administrador de base de datos IndexedDB:
```javascript
class DBManager {
    - openDB(): Inicialización de base de datos
    - saveData(): Guardar datos en object stores
    - getData(): Recuperar datos por ID
    - deleteData(): Eliminar registros
    - clearStore(): Limpiar almacenamiento
    - getAllData(): Listar todos los registros
}
```

**Object Stores**:
- `appData`: Datos principales de la aplicación
- `userSettings`: Configuraciones del usuario
- `cache`: Respuestas de API cacheadas

#### **api-client.js**
Cliente HTTP para comunicación con backend:
```javascript
- Endpoints de ControlD API
- Manejo de autenticación (headers, tokens)
- Reintentos automáticos en caso de fallo
- Timeout configurable
- Transformación de datos (request/response)
```

#### **app.js**
Controlador principal de la webapp:
```javascript
- Inicialización de componentes PWA
- Registro del Service Worker
- Gestión de estado de UI
- Event listeners (refresh, online/offline)
- Actualización dinámica de contenido
- Manejo de errores global
```

#### **index.html**
Estructura HTML5 semántica:
- Meta tags para PWA (viewport, theme-color)
- Link al manifest.json
- Estructura modular (header, main, footer)
- Loading overlay con spinner
- Contenedor dinámico para datos

#### **styles.css**
Estilos CSS3 modernos:
- Variables CSS para tema personalizable
- Flexbox y Grid layout
- Animaciones y transiciones
- Diseño responsivo (mobile-first)
- Estados hover y active
- Loading spinner animado

#### **manifest.json**
Configuración PWA:
```json
{
    "name": "Control D Web",
    "short_name": "ControlD",
    "display": "standalone",
    "theme_color": "#2196F3",
    "icons": [192x192, 512x512]
}
```

#### **config.js**
Configuración centralizada:
- URLs de API
- Timeouts
- Versiones de caché
- Flags de funcionalidades

### Componentes Android Nativos

#### MainActivity.kt
Actividad principal que gestiona:
- Inicialización y configuración del WebView
- Gestión del ciclo de vida de la aplicación
- Control de navegación hacia atrás
- Preservación y restauración del estado
- **Carga de assets locales** (PWA integrada)

#### WebView Settings
Configuraciones clave implementadas:
```kotlin
- javaScriptEnabled = true
- domStorageEnabled = true
- databaseEnabled = true
- cacheMode = LOAD_DEFAULT
- useWideViewPort = true
- allowFileAccess = false
- mixedContentMode = MIXED_CONTENT_COMPATIBILITY_MODE
```

#### CookieManager
Gestión completa de cookies para mantener sesiones:
- Cookies de primera parte habilitadas
- Cookies de tercera parte habilitadas
- Persistencia automática de cookies

#### WebChromeClient
Proporciona soporte para:
- Diálogos JavaScript (alert, confirm, prompt)
- Indicadores de progreso de carga
- Manejo de ventanas emergentes

#### WebViewClient
Controla:
- Navegación dentro del WebView
- Ocultación del indicador de carga al finalizar
- Manejo de errores de red

### Layout
- **FrameLayout**: Contenedor principal que superpone el WebView y el indicador de carga
- **WebView**: Componente de visualización web a pantalla completa
- **ProgressBar**: Indicador visual de carga centrado

## 📋 Requisitos del Sistema

- **Android SDK**: 23 o superior (Android 6.0 Marshmallow)
- **Target SDK**: 35 (Android 15)
- **Compile SDK**: 35
- **Android Studio**: Giraffe o superior
- **Gradle**: 8.x
- **Java**: 17

## 🚀 Instalación y Ejecución

### Pasos para Desarrolladores

1. **Clonar o abrir el proyecto**
   ```bash
   cd /ruta/al/proyecto/ControlDWEBAPP
   ```

2. **Abrir en Android Studio**
   - File → Open → Seleccionar la carpeta del proyecto

3. **Sincronizar Gradle**
   - Android Studio sincronizará automáticamente las dependencias
   - O ejecutar manualmente: `./gradlew sync`

4. **Configurar dispositivo**
   - Conectar un dispositivo Android físico con USB debugging habilitado
   - O configurar un emulador Android (API 23+)

5. **Ejecutar la aplicación**
   - Clic en el botón "Run" (▶) en Android Studio
   - O ejecutar: `./gradlew installDebug`

### Configuración del Keystore para Builds Firmados

Para compilar versiones de release firmadas, necesitas configurar el keystore:

1. **Crear/Editar `local.properties`** (este archivo NO debe subirse a git)
   ```properties
   sdk.dir=/ruta/a/tu/Android/Sdk
   
   # Configuración del Keystore
   KEYSTORE_FILE=/ruta/completa/al/KEYSTORE/Keystore.jks
   KEYSTORE_PASSWORD=tu_password_del_keystore
   KEY_ALIAS=tu_alias
   KEY_PASSWORD=tu_password_de_la_key
   ```

2. **Verificar que el keystore existe** en `KEYSTORE/Keystore.jks`

3. **El archivo `.gitignore` ya protege**:
   - `local.properties` (con tus credenciales)
   - `*.jks` (archivos keystore)
   - Directorio `KEYSTORE/`

**⚠️ IMPORTANTE**: 
- Nunca compartas tu keystore ni tus contraseñas
- Guarda una copia de respaldo del keystore en un lugar seguro
- Si pierdes el keystore, no podrás actualizar tu app en Play Store

Para más detalles, consulta: `KEYSTORE_CONFIG_INSTRUCTIONS.md`

### Generar APK

Para compilar un APK de release:
```bash
./gradlew assembleRelease
```
El APK se generará en: `app/build/outputs/apk/release/`

## 📦 Dependencias

```kotlin
androidx.core:core-ktx:1.15.0           // Extensiones de Kotlin para Android
androidx.appcompat:appcompat:1.7.0       // Compatibilidad con versiones antiguas
com.google.android.material:material:1.12.0  // Componentes Material Design
androidx.constraintlayout:constraintlayout:2.2.0  // Layout constraint
```

## 🔧 Configuración

### Permisos en AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Propiedades de Gradle (gradle.properties)
- Configuración de caché habilitada
- Configuration cache para Gradle 9.0
- AndroidX habilitado
- Clases R no transitivas para mejor rendimiento

## 📝 Funcionalidades del WebView en Detalle

### 1. JavaScript Engine
El WebView utiliza el motor JavaScript de Chromium integrado en Android, permitiendo:
- Ejecución de código JavaScript moderno (ES6+)
- Llamadas AJAX y Fetch API
- Manipulación del DOM
- Event listeners y callbacks
- Frameworks JavaScript (React, Vue, Angular, etc.)

### 2. Almacenamiento de Datos
Múltiples mecanismos de almacenamiento:
- **LocalStorage**: Datos persistentes sin expiración
- **SessionStorage**: Datos temporales de la sesión
- **Cookies**: Para autenticación y preferencias
- **IndexedDB**: Base de datos estructurada del lado del cliente
- **Web SQL**: Base de datos SQL (deprecated pero soportado)

### 3. Gestión de Estado
La aplicación preserva el estado en múltiples escenarios:
- Rotación de pantalla
- Cambios de configuración
- Minimización de la app
- Presión de memoria del sistema

### 4. Navegación
Sistema completo de navegación web:
- Historial hacia atrás y adelante
- Recarga de páginas
- URLs internas y externas
- Redirecciones automáticas

### 5. Renderizado
Capacidades de renderizado modernas:
- HTML5 completo
- CSS3 con animaciones y transformaciones
- Canvas y WebGL
- SVG
- Fuentes web personalizadas

## 🔍 Casos de Uso

### 🌐 Webapp PWA Integrada
1. **Acceso Offline**: Usar la app sin conexión con datos cacheados
2. **Sincronización**: Actualización automática cuando hay conexión
3. **Persistencia de Datos**: Mantener configuraciones localmente
4. **Rendimiento**: Carga rápida desde caché

### 📊 Funcionalidades ControlD
1. **Gestión de DNS**: Configurar y administrar reglas DNS personalizadas
2. **Filtrado de Contenido**: Bloquear dominios específicos
3. **Estadísticas**: Ver análisis de consultas DNS
4. **Configuración de Dispositivos**: Administrar múltiples dispositivos
5. **Control Parental**: Establecer restricciones de contenido
6. **Listas de Bloqueo**: Crear y gestionar listas personalizadas
7. **Logs en Tiempo Real**: Monitorear consultas DNS en vivo

## 📂 Estructura del Proyecto

```
ControlDWEBAPP/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── assets/              # 🌐 PWA Webapp
│   │   │   │   ├── index.html       # Estructura HTML principal
│   │   │   │   ├── styles.css       # Estilos modernos
│   │   │   │   ├── app.js           # Lógica de la webapp
│   │   │   │   ├── service-worker.js # Service Worker PWA
│   │   │   │   ├── db-manager.js    # Gestor IndexedDB
│   │   │   │   ├── api-client.js    # Cliente HTTP API
│   │   │   │   ├── config.js        # Configuración
│   │   │   │   ├── manifest.json    # PWA manifest
│   │   │   │   └── api-integration-example.js
│   │   │   ├── java/com/example/controldwebapp/
│   │   │   │   └── MainActivity.kt  # Activity principal
│   │   │   ├── res/
│   │   │   │   ├── layout/
│   │   │   │   │   └── activity_main.xml
│   │   │   │   ├── values/
│   │   │   │   │   ├── themes.xml
│   │   │   │   │   ├── colors.xml
│   │   │   │   │   └── strings.xml
│   │   │   │   └── mipmap/          # Iconos de la app
│   │   │   └── AndroidManifest.xml
│   │   └── test/                    # Tests unitarios
│   ├── build.gradle.kts             # Configuración Gradle del módulo
│   └── proguard-rules.pro           # Reglas ProGuard
├── gradle/                          # Wrapper de Gradle
├── KEYSTORE/                        # 🔒 Keystores (NO versionado)
├── build.gradle.kts                 # Configuración Gradle del proyecto
├── settings.gradle.kts              # Configuración de módulos
├── local.properties                 # 🔒 Config local (NO versionado)
├── .gitignore                       # Archivos ignorados por Git
├── README.md                        # Este archivo
├── quick.sh                         # Script de build rápido
└── verify-setup.sh                  # Script de verificación
```

## ⚠️ Limitaciones Conocidas

- No soporta descarga de archivos (requiere implementación adicional)
- No tiene soporte para subir archivos desde el dispositivo
- No incluye acceso a cámara o geolocalización (se puede habilitar con permisos adicionales)
- Las notificaciones web push no están implementadas

## ✅ Funcionalidades Implementadas (v1.0.5)

- ✅ **Service Worker** con estrategias de caché
- ✅ **IndexedDB** para almacenamiento persistente
- ✅ **Funcionamiento offline** completo
- ✅ **Cliente API** con manejo de errores
- ✅ **UI moderna** con Material Design
- ✅ **Indicadores de estado** (online/offline)
- ✅ **PWA instalable** via manifest.json
- ✅ **Gestión de sesión** persistente
- ✅ **Keystore security** configurado
- ✅ **Build firmado** automático

## 🔄 Mejoras Futuras Potenciales

- [ ] Soporte para descarga de archivos
- [ ] Selector de archivos para uploads
- [ ] Acceso a geolocalización
- [ ] Soporte para cámara y micrófono
- [ ] Notificaciones push web
- [ ] Modo oscuro nativo (toggle)
- [ ] Atajos de la aplicación (App Shortcuts)
- [ ] Widget de home screen
- [ ] Sincronización en background (WorkManager)
- [ ] Biometría para login (huella/face)
- [ ] Exportación de configuraciones
- [ ] Compartir datos entre apps
- [ ] QR Scanner para configuración rápida

## � Documentación Adicional

El proyecto incluye documentación complementaria:

- **CHECKLIST.md**: Lista de verificación para deployment
- **CONFIGURACION_SERVIDOR.md**: Guía de configuración del servidor
- **IMPLEMENTACION_COMPLETA.md**: Documentación técnica detallada
- **README_RESUMEN.md**: Resumen ejecutivo del proyecto
- **README_WEBAPP_SIMPLE.md**: Guía simplificada de la webapp
- **START_HERE.md**: Guía de inicio rápido
- **KEYSTORE_CONFIG_INSTRUCTIONS.md**: Instrucciones de configuración del keystore
- **app/src/main/assets/README_WEBAPP.md**: Documentación de la webapp PWA

### Scripts Útiles

```bash
# Verificar configuración del proyecto
./verify-setup.sh

# Build rápido de la aplicación
./quick.sh
```

## 🏗️ Arquitectura Técnica

### Flujo de Datos

```
Usuario → MainActivity (Android)
    ↓
WebView (Chromium Engine)
    ↓
index.html (PWA Entry Point)
    ↓
app.js (Controlador Principal)
    ↓
    ├─→ service-worker.js (Caché & Offline)
    ├─→ db-manager.js (Persistencia Local)
    └─→ api-client.js (Backend Communication)
         ↓
    ControlD API Servers
```

### Estrategias de Caché

1. **Cache First** (Recursos Estáticos)
   ```
   Request → Service Worker → Cache → (Si no existe) → Network → Cache → Response
   ```

2. **Network First** (Datos API)
   ```
   Request → Service Worker → Network → Cache → (Si falla) → Cache → Response
   ```

### Almacenamiento en Capas

```
Capa 1: Service Worker Cache (Recursos estáticos)
Capa 2: IndexedDB (Datos estructurados)
Capa 3: LocalStorage (Preferencias simples)
Capa 4: WebView Cookies (Sesiones)
```

## 🧪 Testing

### Para Desarrolladores

```bash
# Ejecutar en modo debug
./gradlew installDebug

# Ver logs en tiempo real
adb logcat | grep "ControlDWebApp"

# Limpiar y reconstruir
./gradlew clean assembleDebug
```

### Verificar Service Worker

1. Abrir Chrome DevTools en el WebView
2. Ir a Application → Service Workers
3. Verificar que el SW está activo
4. Probar modo offline

## �📄 Licencia

Este proyecto es un ejemplo educativo y de demostración.

## 👨‍💻 Desarrollo

**Versión**: 1.0.5  
**Compilado con**: Kotlin + Android SDK 35  
**Arquitectura**: Single Activity + WebView

---

**Nota**: Esta aplicación es un wrapper independiente y no está oficialmente afiliada con ControlD. Se proporciona como una forma conveniente de acceder al servicio web de ControlD en dispositivos Android.

