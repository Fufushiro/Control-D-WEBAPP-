# Changelog - ControlD WebApp

Todas las actualizaciones notables del proyecto se documentarán en este archivo.

---

## [1.10] - 2025-11-06

### 🆕 Nuevas Funcionalidades
- **Doble Swipe para Refrescar**: Implementación de pull-to-refresh que requiere 2 swipes consecutivos hacia abajo
  - Previene refrescos accidentales durante la navegación
  - Feedback visual mejorado con emojis informativos
  - Timeout inteligente de 2 segundos que resetea el contador automáticamente
  - Mensajes dinámicos que indican cuántos swipes faltan

### 🔧 Mejoras Técnicas
- Constantes configurables (`REQUIRED_SWIPES`, `SWIPE_RESET_DELAY`)
- Código más mantenible y modular en `MainActivity.kt`
- Mejor gestión del Handler para evitar memory leaks
- Documentación actualizada en README.md

### 📝 Documentación
- Actualizado README.md con nueva funcionalidad
- Sección "Novedades en v1.10" creada
- Documentación de navegación actualizada

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

