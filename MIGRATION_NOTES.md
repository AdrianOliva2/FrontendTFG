# Migración Capacitor v4 → v8 + Angular 14 → 21

## Resumen General
Migración completa del proyecto FrontendTFG desde Angular 14.2.0 + Capacitor v4 a **Angular 21.2.13 + Capacitor v8.3.4** con arquitectura de componentes standalone.

**Estado**: ✅ **Web y Android compilando exitosamente**  
**Rama**: `migrate/capacitor-v8`  
**Commit**: `c93b996` (Latest)

---

## Cambios Principales

### 1. Angular Migration (14.2.0 → 21.2.13)
- ✅ Migración a **componentes standalone** (sin módulos)
  - Eliminado `src/app/app.module.ts`
  - Todos los componentes ahora tienen `standalone: true`
  - Imports explícitos en cada componente (CommonModule, RouterModule, etc.)
  
- ✅ Actualizado bootstrap en `src/main.ts`:
  ```typescript
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(AppRoutingModule, HttpClientModule, NgbModule)
    ]
  })
  ```

- ✅ TypeScript: 4.9.x → **5.9.x** (requerido por Angular 21)
  - ⚠️ NO upgradear a 6.0.3 (incompatible con Angular 21)

### 2. Capacitor Migration (v4 → v8.3.4)
**Dependencias actualizadas:**
- `@capacitor/core`: 4.x → **8.3.4**
- `@capacitor/cli`: 4.x → **8.3.4**
- `@capacitor/android`: 4.x → **8.3.4**
- `@capacitor/angular`: 1.x → **2.0.3**

**Breaking Changes Aplicados:**
- ✅ Android minSdkVersion: 23 → **24**
- ✅ Android compileSdkVersion: **36** (AGP 8.13.0 compatible)
- ✅ Android targetSdkVersion: **36**
- ✅ Gradle Wrapper: **8.14.3** (compatible con AGP 8.13.0)
- ✅ Android Gradle Plugin: **8.13.0**

### 3. Dependencias Actualizadas
| Paquete | Anterior | Actual |
|---------|----------|--------|
| @angular/* | 14.2.0 | 21.2.13 |
| @angular-devkit/build-angular | ~14.x | ^21.2.11 |
| @angular/cli | ~14.x | ^21.2.11 |
| @ng-bootstrap/ng-bootstrap | 12.0.0 | 20.0.0 |
| rxjs | 7.5.x | 7.8.2 |
| zone.js | 0.11.x | ~0.16.0 |
| bootstrap | 5.1.x | 5.2.0+ |
| tslib | 2.3.x | 2.3.0+ |

**NO ACTUALIZAR:**
- ❌ TypeScript: Mantener en **~5.9.x** (Angular 21 requirement)
- ❌ @types/jasmine, jasmine-core: Para PR de tests separada

### 4. Configuración TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "dom"],
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "useDefineForClassFields": false,
    "paths": {"*": ["./*"]}
  }
}
```

**Cambios clave:**
- ✅ `moduleResolution`: "node" → **"bundler"** (recomendado con Angular CLI)
- ✅ `target`: "es2020" → **"es2022"**
- ✅ `useDefineForClassFields`: **false** (para compatibilidad)
- ✅ Removidos: `baseUrl`, `downlevelIteration` (deprecados)

### 5. Componentes Standalone
**Ejemplo de conversión:**
```typescript
// ANTES (app.module.ts)
@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, RouterModule, NgbModule]
})

// AHORA (nav-bar.component.ts)
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
  templateUrl: './nav-bar.component.html'
})
```

**Componentes actualizados:** 
- ✅ nav-bar, item, menu, order, orders
- ✅ create-order, sign-in, sign-up, sign-out-modal, token-invalid-modal

### 6. Android Platform
- ✅ Carpeta `android/` creada con `npx cap add android`
- ✅ Web assets copiados: `npx cap copy android`
- ✅ APK Debug compilado exitosamente
  - Ubicación: `android/app/build/outputs/apk/debug/app-debug.apk`
  - Warnings normales (flatDir, unchecked operations) - no afectan compilación
  - Build time: ~30 segundos

### 7. Verificaciones Completadas
✅ **Web:**
- `npm start` → Compilación exitosa, servidor en localhost:4200
- `npm run build` → Angular build completo sin errores

✅ **Android (Native):**
- Android Studio: Gradle sincronizó exitosamente
- `./gradlew assembleDebug` → APK generado sin errores
- SDK detectado automáticamente por Android Studio

⏳ **Tests:**
- `npm test` → Fallan por constructores sin parámetros en specs
- Planeados para PR separada

❌ **iOS:**
- No implementado (no hay macOS disponible)
- Podría añadirse si es necesario en futuro

---

## Notas Técnicas

### Capacitor v8 Breaking Changes Review
Según documentación oficial, los cambios principales abordados:

1. **Android SDK Mínimo (API 24)** ✅ Configurado
2. **Gradle/AGP Updates** ✅ Actualizado a AGP 8.13.0
3. **AndroidX Requerido** ✅ Presente en build.gradle
4. **iOS minVersion iOS 15** ⏭️ No implementado aún
5. **Plugin API Changes** ✅ No plugins personalizados, core funcionando

### Performance
- Standalone components reducen tamaño del bundle
- Zone.js 0.16.x más optimizado que 0.11.x
- No hay regresión de performance observada

### Compatibilidad
- ✅ Angular 21 compatible con Capacitor 8
- ✅ ng-bootstrap 20 funciona correctamente
- ✅ RxJS 7.8 compatible con Angular 21
- ✅ TypeScript 5.9 requerido (no upgradeble a 6.0)

---

## Próximos Pasos

### PR Actual (migrate/capacitor-v8)
- [x] Migración a Angular 21 standalone
- [x] Upgrade a Capacitor v8
- [x] Actualización de dependencias (patch/minor)
- [x] Android native compilando
- [x] Documentación de cambios
- [ ] Tests (separado en otra PR)

### PR Futura: Actualizar Tests
- Actualizar constructores en `*.spec.ts`
- Actualizar @types/jasmine a 6.0.0
- Actualizar jasmine-core a 6.2.0
- Ejecutar y pasar todos los tests

### Opcional (Futuro)
- Agregar iOS support (@capacitor/ios)
- CocoaPods + Pod install
- Tests en emulador/dispositivo real
- Publicar a App Store/Play Store

---

## Verificación Rápida

**Compilar web:**
```bash
npm install  # ya hecho
npm start    # dev server en localhost:4200
npm run build # producción
```

**Compilar Android:**
```bash
npx cap copy android  # sincronizar assets
cd android
./gradlew assembleDebug  # APK en app/build/outputs/apk/debug/
```

**Ver cambios:**
```bash
git log --oneline | head -5
git diff HEAD~1..HEAD --stat
```

---

## Contacto / Dudas
Si encuentras problemas en integración o compilación, revisa:
- `android/local.properties` (ruta SDK)
- `tsconfig.json` (target, lib, paths)
- `src/main.ts` (bootstrap config)
- `package.json` (versiones exactas de dependencias)

**Rama actual:** `migrate/capacitor-v8` | **Test status:** ⏳ Pendiente (PR futura)
