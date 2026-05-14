# FrontendTFG

FrontendTFG es el front-end del proyecto de fin de grado. Está escrito en Angular (versión 21) usando componentes standalone y está preparado para ejecutarse como aplicación web y como app móvil nativa (Capacitor + Android).

## Resumen rápido

- Angular: 21.2.13 (standalone components)
- TypeScript: ~5.9.0 (no actualizar a TS 6)
- Capacitor: ^8.3.4 (core, cli, android)
- Test runner: Karma + Jasmine (Karma v6)

## Contenido del README

- **Tecnologías** — pila usada.
- **Instalación** — cómo preparar el entorno.
- **Desarrollo** — comandos para ejecutar la app en dev.
- **Tests** — ejecución y CI (headless).
- **Android (Capacitor)** — cómo compilar la APK.
- **Branches & PRs** — ramas importantes en este repo.
- **Notas de migración** — resumen de los cambios realizados.

## Requisitos previos

- Node.js (v18+ recomendada) y npm.
- Java JDK + Android SDK/Android Studio (si vas a compilar Android).
- Chrome instalado para Karma (o usar `ChromeHeadless`).

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/AdrianOliva2/FrontendTFG.git
cd FrontendTFG
```

2. Instala dependencias:

```bash
npm install
```

## Desarrollo

- Servidor de desarrollo (live-reload):

```bash
npm start
# o
ng serve
```

- Build de producción:

```bash
npm run build
```

## Tests

Se usa Karma + Jasmine. Para ejecutar en modo interactivo (abre Chrome):

```bash
npm test
```

Para integración continua / ejecución headless (recomendado en CI):

```bash
npm run test:ci
# equivale a: ng test --watch=false --browsers=ChromeHeadless
```

> Nota: si cierras manualmente la ventana de Karma/Chrome verás logs tipo `Disconnected` o errores de Chrome (`PHONE_REGISTRATION_ERROR`) — son consecuencia del cierre/crash del navegador y no indican fallos en los tests si previamente marcaron `TOTAL: X SUCCESS`.

## Android (Capacitor)

El proyecto soporta compilación Android mediante Capacitor 8. Pasos resumidos:

### Primero instala Android Studio y luego realiza los siguientes pasos:

```bash
# Instalar capacidades nativas (si aún no está creada):
npx cap add android

# Sincronizar cambios web y compilar Android
npm run build
npx cap copy android
cd android
./gradlew assembleDebug
# APK generado en android/app/build/outputs/apk/debug/app-debug.apk
```

## Branches y PR relevantes

- `fix/tests` — arreglos de tests (specs adaptados a componentes standalone, `test:ci`, typings).
- `migrate/capacitor-v8` — migración y ajustes para Capacitor v8 y Android.

## Notas de migración y decisiones importantes

- Migración Angular 14 → 21: se convirtieron componentes a standalone y se reemplazó el arranque por `bootstrapApplication(...)`.
- TypeScript se mantiene en `~5.9.0` por compatibilidad con Angular; no actualizar a TS 6.
- Tests: se reemplazó `require.context` por imports estáticos en `src/test.ts` porque el bundler de Karma/webpack del entorno actual no soportaba la llamada en tiempo de ejecución.
- Capacitor: actualizado a ^8.3.4; Android build probado con AGP y Gradle wrapper actualizados.

## Contribuciones

Si deseas contribuir, por favor crea una rama desde `master`, añade cambios y abre un PR. Si tu cambio afecta tests o la configuración de Android, descríbelo en el PR.

## Contacto

Para dudas o revisiones, abre un issue o PR en este repositorio.

---
Documento actualizado por el equipo de desarrollo — incluye instrucciones para ejecutar tests en modo headless y pasos de compilación nativa.
