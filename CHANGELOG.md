# Changelog - ControlD WebApp

Todas las actualizaciones notables del proyecto se documentarán en este archivo.

---

## [1.13] - 2026-02-03

### 🎨 Mejoras de UI/UX
- **Espacio reservado para barra de notificaciones**: WebView ya no cubre la barra de estado
  - Espaciador de 25dp superior en el layout
  - Cambio de FrameLayout a LinearLayout para mejor control de espacios
  - Navegación web mejorada sin superposiciones

### 🚫 Eliminación de Funcionalidades Problemáticas
- **Pull-to-refresh eliminado**: Causa errores en navegación web
  - Inyección defensiva de JavaScript bloquea overscroll behavior
  - Touchmove optimizado para no permitir gestos de refresh
  
- **Refresh manual deshabilitado**: Controles innecesarios removidos
  - Ctrl+R / Cmd+R bloqueado vía JavaScript
  - F5 y F12 deshabilitados en el navegador
  - Evita actualizaciones no deseadas de la página

### 🔐 Privacidad Mejorada
- APIs limitadas: Geolocalización deshabilitada, acceso a archivos restringido
- Sin fingerprinting: Datos de dispositivo no expuestos al sitio web
- Minimalismo de permisos: Solo requiere acceso a Internet
- Seguridad mejorada: No permite abrir ventanas emergentes automáticas

### ⚡ Rendimiento
- Inyección defensiva mejorada con manejo de eventos
- CSS defensivo optimizado para bloquear gestos innecesarios
- Limitación de MutationObservers mantiene scroll fluido
- Compilación Kotlin corregida: APIs deprecadas removidas

### 🔧 Correcciones Técnicas
- **Eliminadas propiedades deprecadas en WebSettings**:
  - `geolocationEnabled` removida (deprecated en API 35)
  - `userAgent` removida (deprecated en API levels recientes)
  - Geolocalización ahora controlada únicamente por permisos de Android
  - User-Agent manejado automáticamente por Android

### 📊 Cambios de Versión
- versionCode: 12 → 13
- versionName: "1.12" → "1.13"

---

## [1.12] - 2025-11-06

### 🐛 Correcciones de UI/UX
- **Pantalla Completa Eliminada**: El WebView ahora respeta la barra de notificaciones del sistema
  - Agregado `android:fitsSystemWindows="true"` al layout principal
  - Eliminada la superposición de la barra de notificaciones sobre el contenido web
  - Mejor experiencia de navegación sin interrupciones visuales

### ❌ Funcionalidades Removidas
- **Pull-to-Refresh Eliminado Completamente**:
  - Removido `SwipeRefreshLayout` del layout XML
  - Eliminada toda la lógica de doble swipe y refresh
  - Eliminados imports innecesarios
  - Código simplificado y más mantenible
  - Sin errores relacionados con gestos de swipe

### 🔧 Mejoras de Código
- Limpieza de código en `MainActivity.kt`
  - Eliminadas variables no utilizadas
  - Código más limpio y directo

---

## [1.11] - 2025-11-06

### 🐛 Correcciones Críticas
- **Nombre de la App Corregido**: Cambiado a "ControlD"
  - Actualizado `strings.xml` con el nombre correcto
  - Modificado `AndroidManifest.xml` para usar recurso string

- **Iconos Personalizados Activados**: Los iconos personalizados ahora se muestran correctamente
  - Configurado `AndroidManifest.xml` para usar `@mipmap/controldns` y `@mipmap/controldns_round`
  - Los iconos controldns.webp ahora se cargan correctamente

### 🔧 Mejoras Técnicas
- **Configuración de Keystore Mejorada**: 
  - Implementación correcta de carga de `local.properties` en `build.gradle.kts`
  - Firma de APK funcionando correctamente con credenciales

---

## [1.10] - 2025-11-06

### 🆕 Nuevas Funcionalidades
- **Doble Swipe para Refrescar**: Implementación de pull-to-refresh que requiere 2 swipes consecutivos hacia abajo
  - Previene refrescos accidentales durante la navegación
  - Feedback visual mejorado con emojis informativos
  - Timeout inteligente de 2 segundos que resetea el contador automáticamente

### 🔧 Mejoras Técnicas
- Constantes configurables (`REQUIRED_SWIPES`, `SWIPE_RESET_DELAY`)
- Código más mantenible y modular en `MainActivity.kt`
- Mejor gestión del Handler para evitar memory leaks

---

## [1.0.5] - 2025-11-05

### 🌐 Progressive Web App (PWA) Integrada
- **Service Worker** con estrategias de caché inteligentes
- **IndexedDB** para almacenamiento persistente
- **Funcionamiento offline** completo
- **Cliente API** con manejo robusto de errores
- **UI moderna** con Material Design
- **Indicadores de estado** (online/offline)
- **PWA instalable** via manifest.json

### 🔒 Seguridad
- Configuración de keystore para builds firmados
- Sistema de firma automática desde `local.properties`
- Scripts de verificación incluidos

### 📦 Build System
- Gradle actualizado con configuración mejorada
- Scripts `verify-setup.sh` y `quick.sh`
- Build de release firmado automatizado

---

## [1.0.0] - Versión Inicial

### ✨ Características Principales
- WebView completo y moderno para ControlD
- JavaScript y DOM Storage habilitados
- Gestión completa de cookies (primera y tercera parte)
- Navegación con botón de retroceso
- Indicador de carga visual
- Restauración de estado tras rotación
- Material Design 3
- Android SDK 35 target

---

**Formato**: [Versión] - Fecha (YYYY-MM-DD)  
**Tipos de cambios**: 🆕 Nuevas Funcionalidades | 🔧 Mejoras | 🐛 Correcciones | 📝 Documentación | 🔒 Seguridad
