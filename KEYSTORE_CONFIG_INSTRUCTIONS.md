# Configuración del Keystore - Template

Este archivo muestra cómo configurar el keystore en `local.properties`.

## Paso 1: Abre el archivo `local.properties` 

## Paso 2: Reemplaza los valores de placeholder:

```properties
# Keystore configuration for signing releases
KEYSTORE_FILE=/home/fufushiro/AndroidStudioProjects/ControlDWEBAPP/KEYSTORE/Keystore.jks
KEYSTORE_PASSWORD=tu_password_aqui          # ← CAMBIA ESTO por tu password del keystore
KEY_ALIAS=tu_alias_aqui                     # ← CAMBIA ESTO por tu alias
KEY_PASSWORD=tu_key_password_aqui           # ← CAMBIA ESTO por tu key password
```

## Paso 3: Guarda el archivo

## IMPORTANTE:
- **NUNCA** hagas commit de `local.properties` con tus credenciales reales
- Guarda una copia de respaldo de `KEYSTORE/Keystore.jks` en un lugar seguro
- Si pierdes el keystore, no podrás actualizar tu app en Play Store

## Para obtener la información de tu keystore:
Si no recuerdas los valores, puedes verificarlos con:
```bash
keytool -list -v -keystore KEYSTORE/Keystore.jks
```

