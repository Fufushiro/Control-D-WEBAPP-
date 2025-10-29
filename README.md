# ControlD WebApp v1.0.0

Aplicación Android nativa desarrollada en Kotlin que proporciona una experiencia de navegación completa para el servicio web de ControlD (https://controld.com/) mediante un WebView optimizado.

## 📱 Descripción de la Aplicación

Esta aplicación funciona como un contenedor nativo (WebView wrapper) para el sitio web de ControlD, permitiendo a los usuarios acceder a todos los servicios de ControlD directamente desde una app Android sin necesidad de usar un navegador web tradicional.

### ¿Qué es ControlD?

ControlD es un servicio de DNS personalizable que permite controlar y filtrar el tráfico de internet, bloqueando anuncios, rastreadores, malware y contenido no deseado a nivel de DNS.

## ✨ Características Principales

### 🌐 WebView Completo y Moderno
La aplicación implementa un WebView Android con todas las funcionalidades necesarias para una experiencia web completa:

- **JavaScript Habilitado**: Permite la ejecución de código JavaScript necesario para el funcionamiento completo del sitio
- **DOM Storage**: Almacenamiento local (localStorage y sessionStorage) para guardar preferencias y datos de sesión
- **Base de Datos Web**: Soporte para almacenamiento persistente de datos
- **Cookies Completas**: Gestión de cookies de primera y tercera parte para mantener sesiones de usuario
- **Modo de Caché Inteligente**: Utiliza caché cuando está disponible para mejorar el rendimiento
- **Viewport Adaptable**: Ajusta automáticamente el contenido al tamaño de la pantalla
- **Aceleración por Hardware**: Mejora el rendimiento de renderizado y animaciones

### 🔐 Gestión de Sesión y Autenticación

- Soporte completo para login y autenticación en ControlD
- Las cookies de sesión se mantienen entre aperturas de la app
- Restauración automática del estado de navegación tras rotación de pantalla
- Los datos de sesión persisten durante el uso de la aplicación

### 📱 Navegación Intuitiva

- **Botón Atrás**: El botón de retroceso del dispositivo navega hacia atrás en el historial del WebView
- **Historial de Navegación**: Mantiene un historial completo de las páginas visitadas dentro de la app
- **Indicador de Carga**: Barra de progreso circular mientras se cargan las páginas
- **Pantalla Completa**: Experiencia inmersiva sin barras de navegación del navegador

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

### Componentes Principales

#### MainActivity.kt
Actividad principal que gestiona:
- Inicialización y configuración del WebView
- Gestión del ciclo de vida de la aplicación
- Control de navegación hacia atrás
- Preservación y restauración del estado

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

1. **Gestión de DNS**: Configurar y administrar reglas DNS personalizadas
2. **Filtrado de Contenido**: Bloquear dominios específicos
3. **Estadísticas**: Ver análisis de consultas DNS
4. **Configuración de Dispositivos**: Administrar múltiples dispositivos
5. **Control Parental**: Establecer restricciones de contenido

## ⚠️ Limitaciones Conocidas

- No soporta descarga de archivos (requiere implementación adicional)
- No tiene soporte para subir archivos desde el dispositivo
- No incluye acceso a cámara o geolocalización (se puede habilitar con permisos adicionales)
- Las notificaciones web no están implementadas

## 🔄 Mejoras Futuras Potenciales

- [ ] Soporte para descarga de archivos
- [ ] Selector de archivos para uploads
- [ ] Acceso a geolocalización
- [ ] Soporte para cámara y micrófono
- [ ] Notificaciones push web
- [ ] Modo oscuro nativo
- [ ] Atajos de la aplicación
- [ ] Widget de home screen

## 📄 Licencia

Este proyecto es un ejemplo educativo y de demostración.

## 👨‍💻 Desarrollo

**Versión**: 1.0.0  
**Compilado con**: Kotlin + Android SDK 35  
**Arquitectura**: Single Activity + WebView

---

**Nota**: Esta aplicación es un wrapper independiente y no está oficialmente afiliada con ControlD. Se proporciona como una forma conveniente de acceder al servicio web de ControlD en dispositivos Android.

