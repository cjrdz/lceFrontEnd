# Estructura de dominios de lceFrontEnd

Este documento traduce la propuesta (`propuesta-LegalCoreEngine.md`) a una estructura de carpetas Astro + Svelte. Cada directorio marcado con `.gitkeep` es un módulo que aún no tiene código; el `.gitkeep` contiene una descripción breve de los archivos que irán allí.

> **Nota:** Las carpetas y archivos existentes (`src/components/auth`, `src/components/layout`, `src/components/users`, `src/pages/login.astro`, `src/pages/dashboard.astro`, `src/pages/dashboard/usuarios.astro`, `src/lib/api/users.ts`, etc.) siguen funcionando. Los nuevos módulos se agregan al lado y se empiezan a usar a medida que se implementan los endpoints en el backend.

## 1. Páginas (`src/pages/`)

| Directorio | Rol | Futuro |
|--------------|-----|--------|
| `index.astro` | Landing | (ya existe) |
| `login.astro` | Login | (ya existe) |
| `pending-approval.astro` | Usuario pendiente | (ya existe) |
| `auth/` | Callbacks de auth | (ya existe) |
| `dashboard.astro` | Dashboard principal | (ya existe) |
| `dashboard/usuarios.astro` | Gestión de usuarios | (ya existe) |
| `dashboard/clientes/` | Clientes | listado, detalle, nuevo |
| `dashboard/casos/` | Casos legales | listado, detalle, nuevo, etapas |
| `dashboard/etapas/` | Etapas de caso | catálogo e historial |
| `dashboard/conciliaciones/` | Conciliación | crear/editar |
| `dashboard/edictos/` | Edictos | registrar publicaciones |
| `dashboard/curadores/` | Curador ad-litem | registrar actas |
| `dashboard/sentencias/` | Sentencia | dictada y firme |
| `dashboard/diligencias/` | Diligencias de embargo | asignar, ver, actualizar |
| `dashboard/gastos/` | Gastos operativos | registrar mensajero, papelería, etc. |
| `dashboard/catalogo/` | Catálogo de costos | CRUD + importar CSV/JSON |
| `dashboard/facturas/` | Facturas de proveedor | subir, revisar, aprobar líneas |
| `dashboard/estimados/` | Estimados de costo | generar y ver snapshot |
| `dashboard/pagos/` | Pagos del deudor | registrar historial |
| `dashboard/expedientes/` | Expediente digital | documentos + versiones |
| `dashboard/alertas/` | Alertas de plazos | listado, atender |
| `dashboard/reportes/` | Reportes | estimado vs real y operativos |
| `dashboard/configuracion/` | Configuración del despacho | firm, umbral, roles |
| `api/v1/[...path].ts` | Proxy BFF al backend | (ya existe) |
| `api/v1/auth/` | BFF específico para auth / callbacks | futuro |
| `api/v1/users/` | BFF específico para users | futuro |
| `api/v1/clients/` | BFF específico para clients | futuro |
| `api/v1/cases/` | BFF específico para cases | futuro |
| `api/v1/casestages/` | BFF específico para case stages | futuro |
| `api/v1/conciliaciones/` | BFF específico para conciliaciones | futuro |
| `api/v1/edictos/` | BFF específico para edictos | futuro |
| `api/v1/curadores/` | BFF específico para curadores | futuro |
| `api/v1/sentencias/` | BFF específico para sentencias | futuro |
| `api/v1/diligencias/` | BFF específico para diligencias | futuro |
| `api/v1/gastos/` | BFF específico para gastos | futuro |
| `api/v1/catalog/` | BFF específico para catálogo de costos | futuro |
| `api/v1/invoices/` | BFF específico para facturas | futuro |
| `api/v1/estimates/` | BFF específico para estimados | futuro |
| `api/v1/payments/` | BFF específico para pagos | futuro |
| `api/v1/documents/` | BFF específico para documentos | futuro |
| `api/v1/alerts/` | BFF específico para alertas | futuro |
| `api/v1/reports/` | BFF específico para reportes | futuro |
| `api/v1/rights/` | BFF específico para solicitudes ARCO-POL | futuro |
| `api/v1/uploads/` | BFF para subida de archivos | futuro |
| `api/v1/webhooks/` | BFF para webhooks de proveedores (JSON DTE) | futuro |

## 2. BFF (Backend for Frontend) (`src/pages/api/v1/`)

- `api/v1/[...path].ts` es el proxy catch-all que reenvía todo al backend Go.
- Cada dominio puede tener rutas propias (`src/pages/api/v1/<dominio>/[...path].ts` o `index.ts`) cuando se necesite:
  - Validación de input antes de llamar al backend.
  - Transformación de respuesta para la UI.
  - Caché o rate-limit.
  - Enriquecimiento de datos (ej. lookup de catálogo).
- Todos los clientes de `src/lib/api/` apuntan a `/api/v1/...` y **nunca** al backend directamente.
- El proxy reenvía cookies de sesión para que el backend Go valide la sesión con SuperTokens.

## 3. Componentes (`src/components/`)

| Directorio | Rol |
|------------|-----|
| `auth/` | Forms y callbacks de autenticación (ya existe). |
| `layout/` | DashboardLayout, navegación, cabecera (ya existe). |
| `ui/` | Componentes shadcn-svelte base (ya existe). |
| `users/` | Gestión de usuarios (ya existe). |
| `clients/` | Formularios y listas de clientes. |
| `cases/` | Formularios, timeline y detalle de casos. |
| `case-stages/` | Avance de etapas y catálogo. |
| `conciliaciones/` | Formulario de conciliación. |
| `edictos/` | Registro de publicaciones. |
| `curadores/` | Registro de curador ad-litem. |
| `sentencias/` | Registro de sentencia. |
| `diligencias/` | Asignación y seguimiento de diligencias. |
| `gastos/` | Registro de gastos operativos. |
| `catalog/` | Tabla de catálogo de costos. |
| `invoices/` | Uploader de facturas, cola de revisión, aprobaciones. |
| `estimates/` | Generador de estimados. |
| `payments/` | Registro de pagos. |
| `documents/` | Explorador de expediente, versiones, visibilidad cliente. |
| `alerts/` | Widget y lista de alertas. |
| `reports/` | Tablas y gráficos de reportes. |
| `config/` | Configuración de despacho y permisos. |

## 4. Bibliotecas (`src/lib/`)

| Directorio | Rol |
|------------|-----|
| `api/client.ts` | BFF fetch client compartido (redirect 401, credentials, JSON). |
| `api/users.ts` | API de usuarios (ya existe, usa `client.ts`). |
| `api/*.ts` | Un archivo por dominio (`clients.ts`, `cases.ts`, `invoices.ts`, etc.). |
| `types/` | Tipos TypeScript compartidos (modelos de dominio). |
| `stores/` | Stores Svelte (auth ya existe; posibles `caseStore`, `alertStore`). |
| `auth/` | Helpers de SuperTokens (ya existe). |
| `validation/` | Esquemas Zod/Valibot para formularios. |
| `format/` | Formateo de moneda (USD), fechas, distancias. |
| `utils.ts` | Helpers genéricos (ya existe). |

## 5. Estilos (`src/styles/`)

- `global.css` (ya existe).
- Futuro: `dashboard.css`, `print.css` para reportes.

## 6. Tests (`src/**/*.test.ts`)

- Tests unitarios al lado del componente (convención actual).
- Tests de integración para stores y API en `src/lib/api/*.test.ts`.
- Tests del BFF proxy y de cada endpoint de dominio en `src/pages/api/v1/**/*.test.ts`.

## 7. Convenciones

1. Un directorio por dominio en `components/` y `pages/dashboard/`.
2. Cada página Astro delega a un componente Svelte principal (`<XPage>`).
3. Cada dominio tiene un cliente en `src/lib/api/<dominio>.ts` que consume `/api/v1/...` a través de `src/lib/api/client.ts`.
4. Cada dominio puede tener BFF propio en `src/pages/api/v1/<dominio>/` cuando se requiera lógica de validación, transformación o caché antes de llamar al backend Go.
5. Los permisos se leen desde `context.locals.role` en el middleware; los componentes reciben `user`, `role` y `firm` como props.
6. Los montos se muestran en USD con `DECIMAL(12,2)`; las fechas en formato local `es-SV`.
7. El frontend nunca llama al backend Go directamente; siempre pasa por el BFF local.
