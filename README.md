# ControlD WebApp v1.13

Aplicación Android nativa (WebView wrapper) para acceder a [ControlD](https://controld.com/) con enfoque en **privacidad**, **rendimiento** y **usabilidad mejorada**.

## 🎯 Qué hace

- Encapsula el sitio web de ControlD en una app Android nativa
- Interfaz web responsiva optimizada para dispositivos móviles
- Gestión de sesiones persistentes con cookies
- Funcionamiento completo offline mediante Service Worker

## 🔐 Privacidad (v1.13)

- **APIs limitadas**: Geolocalización deshabilitada, acceso a archivos restringido
- **Sin fingerprinting**: Datos de dispositivo no expuestos al sitio web
- **Minimalismo de permisos**: Solo requiere acceso a Internet
- **Seguridad mejorada**: No permite abrir ventanas emergentes automáticas

## ⚡ Rendimiento (v1.13)

- **Inyección defensiva de CSS**: Elimina animaciones innecesarias
- **Scroll fluido**: Limita observers agresivos que causan jank
- **Caché inteligente**: LOAD_DEFAULT para reutilizar recursos locales
- **Arranque rápido**: Restauración automática de estado

## ✨ Características

- **WebView completo**: JavaScript, DOM Storage, IndexedDB, Cookies habilitados
- **PWA integrada**: Service Worker con caché offline en `app/src/main/assets/`
- **Navegación fluida**: Botón atrás nativo, historial del navegador
- **Hardware acelerado**: Renderizado optimizado para Android moderno
- **Responsive**: Adaptación automática a orientación y tamaño de pantalla
- **UI mejorada**: Espacio reservado para barra de notificaciones (no se superpone)
- **Sin pull-to-refresh**: Eliminado para evitar errores de actualización
- **Sin refresh manual**: Deshabilitados Ctrl+R, F5 y gestos de refresh

## 📋 Requisitos

- Android SDK 23+ (6.0 Marshmallow)
- Android Studio Giraffe+
- Gradle 8.x
- Java 17

## 🚀 Instalación

1. **Abrir proyecto en Android Studio**
   ```bash
   File → Open → Seleccionar carpeta del proyecto
   ```

2. **Sincronizar Gradle**
   - Android Studio lo hará automáticamente
   - O: `./gradlew sync`

3. **Conectar dispositivo**
   - Dispositivo físico con USB debugging habilitado
   - O configurar emulador (API 23+)

4. **Ejecutar**
   - Clic en botón "Run" (▶) en Android Studio
   - O: `./gradlew installDebug`

## 🔑 Builds Firmados (Release)

Configurar `local.properties` (NO versionado):

```properties
sdk.dir=/ruta/a/tu/Android/Sdk

# Keystore
KEYSTORE_FILE=/ruta/completa/al/KEYSTORE/Keystore.jks
KEYSTORE_PASSWORD=password
KEY_ALIAS=alias
KEY_PASSWORD=password
```

Generar APK de release:
```bash
./gradlew assembleRelease
```

**⚠️ IMPORTANTE**: Guardar copia de respaldo segura del keystore. Sin él, no podrás actualizar la app en Play Store.

Detalles: [KEYSTORE_CONFIG_INSTRUCTIONS.md](KEYSTORE_CONFIG_INSTRUCTIONS.md)

## 📦 Dependencias

```kotlin
androidx.core:core-ktx:1.15.0
androidx.appcompat:appcompat:1.7.0
com.google.android.material:material:1.12.0
androidx.constraintlayout:constraintlayout:2.2.0
```

## 🔧 Permisos

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## 📁 Estructura

```
app/
├── src/main/
│   ├── java/com/example/controldwebapp/
│   │   └── MainActivity.kt         # WebView + privacidad + rendimiento
│   ├── assets/                     # PWA integrada
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── service-worker.js
│   │   ├── db-manager.js
│   │   ├── api-client.js
│   │   └── manifest.json
│   ├── res/
│   │   ├── layout/activity_main.xml
│   │   ├── values/
│   │   └── mipmap/               # Iconos
│   └── AndroidManifest.xml
└── build.gradle.kts
```

## 🆕 Cambios v1.13

### Privacidad
- ✅ User-Agent personalizado (Firefox-like, sin identificadores del sistema)
- ✅ Geolocalización deshabilitada
- ✅ Acceso a archivos restringido (`allowFileAccess=false`)
- ✅ APIs de ventanas emergentes deshabilitadas

### Rendimiento
- ✅ Inyección defensiva de CSS para scroll fluido
- ✅ Limpieza de animaciones innecesarias (animation-duration: 0s)
- ✅ Limitación de MutationObservers (máx 10 activos)
- ✅ Arranque optimizado con restauración de estado

### Limpieza
- ✅ Eliminación de dependencia SwipeRefreshLayout innecesaria
- ✅ Refactorización de MainActivity.kt (código más limpio y modular)
- ✅ Eliminación de archivos .md vacíos
- ✅ README condensado (claridad y brevedad)

## 📝 Versiones Recientes

### v1.13
- Espacio reservado para barra de notificaciones
- Eliminación de pull-to-refresh
- Deshabilitación de refresh manual (Ctrl+R, F5)
- APIs deprecadas removidas (geolocationEnabled, userAgent)
- Simplificación de código y mejor usabilidad

### v1.12
- Respeto de barra de notificaciones
- Eliminación de pull-to-refresh
- Simplificación de código


## 🔍 Debugging

```bash
# Ver logs en tiempo real
adb logcat | grep "ControlDWebApp"

# Limpiar y reconstruir
./gradlew clean assembleDebug

# Instalar en dispositivo
adb install app/build/outputs/apk/debug/app-debug.apk
```

## 📚 Documentación Adicional

- [CHANGELOG.md](CHANGELOG.md) - Historial de cambios detallado
- [KEYSTORE_CONFIG_INSTRUCTIONS.md](KEYSTORE_CONFIG_INSTRUCTIONS.md) - Guía de keystore
- [app/src/main/assets/README_WEBAPP.md](app/src/main/assets/README_WEBAPP.md) - Detalles PWA

## 📄 Licencia

Proyecto educativo y de demostración.

---

**Nota**: App independiente, no oficialmente afiliada con ControlD.
