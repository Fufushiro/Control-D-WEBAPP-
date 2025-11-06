# Versión 1.11 - Correcciones

**Fecha:** 6 de Noviembre, 2025

## 🔧 Problemas Corregidos

### 1. **Nombre de la App Corregido**
- **Problema:** La aplicación mostraba "ControlD Web" en lugar de simplemente "ControlD"
- **Solución:** 
  - Actualizado `strings.xml` para cambiar el nombre de la app a "ControlD"
  - Modificado `AndroidManifest.xml` para usar el recurso string `@string/app_name` en lugar de hardcodear el nombre

**Archivos modificados:**
- `app/src/main/res/values/strings.xml`
- `app/src/main/AndroidManifest.xml`

### 2. **Iconos de la App Configurados**
- **Problema:** Los iconos personalizados (controldns.webp) no se estaban usando - la app usaba el icono por defecto de Android
- **Solución:**
  - Actualizado `AndroidManifest.xml` para usar `@mipmap/controldns` y `@mipmap/controldns_round`
  - Los iconos personalizados ahora se muestran correctamente en el launcher

**Archivos modificados:**
- `app/src/main/AndroidManifest.xml`

### 3. **Configuración de Keystore Mejorada**
- **Problema:** La configuración de firma no cargaba correctamente las propiedades desde `local.properties`
- **Solución:**
  - Agregado código para cargar explícitamente `local.properties` usando `java.util.Properties`
  - Agregados imports necesarios (`java.util.Properties` y `java.io.File`)
  - La firma del APK ahora funciona correctamente con las credenciales desde `local.properties`

**Archivos modificados:**
- `app/build.gradle.kts`

**Configuración del Keystore en local.properties:**
```properties
KEYSTORE_FILE=/home/fufushiro/AndroidStudioProjects/ControlDWEBAPP/KEYSTORE/key.jks
KEYSTORE_PASSWORD=DRAGON
KEY_ALIAS=Ankherth
KEY_PASSWORD=DRAGON
```

## ✅ Verificación

El APK de release se construye correctamente con:
- **Nombre de app:** ControlD (confirmado)
- **Iconos:** Personalizados (controldns)
- **Firma:** Correctamente firmado con el keystore configurado
- **Ubicación del APK:** `app/release/app-release.apk`

## 📝 Notas

### ¿Por qué ocurrió el problema?

El problema del nombre y los iconos no era un cambio reciente - **siempre estuvo así desde la versión 1.0.0**. El `AndroidManifest.xml` original nunca usó los iconos personalizados que estaban en los directorios `mipmap-*`, sino que apuntaba al icono por defecto del sistema Android (`@android:drawable/sym_def_app_icon`).

Los archivos de iconos personalizados (`controldns.webp`, `controldns_round.webp`) estaban en el proyecto pero no se referenciaban en el manifest, por lo que Android usaba los iconos por defecto.

### Cambios Aplicados

```xml
<!-- ANTES -->
<application
    android:label="ControlD Web"
    android:icon="@android:drawable/sym_def_app_icon"
    android:roundIcon="@android:drawable/sym_def_app_icon"
    ...>

<!-- DESPUÉS -->
<application
    android:label="@string/app_name"
    android:icon="@mipmap/controldns"
    android:roundIcon="@mipmap/controldns_round"
    ...>
```

## 🚀 Construcción

Para generar un nuevo APK:

```bash
./gradlew clean assembleRelease
```

El APK firmado se encontrará en:
- `app/build/outputs/apk/release/app-release.apk`
- Copiado a: `app/release/app-release.apk`

