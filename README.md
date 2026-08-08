# lceFrontEnd

Astro + Svelte frontend para **LegalCore Engine**. Actúa como **BFF (Backend for Frontend)** desplegado en Cloudflare Workers: el navegador nunca habla directamente con el backend Go; lo hace a través de las rutas `/api/v1/*` de este proyecto, que reenvían cookies de sesión y pueden transformar/enriquecer datos antes de llegar al backend.

## Stack

- [Astro](https://astro.build/) 7
- [Svelte](https://svelte.dev/) 5
- [shadcn-svelte](https://www.shadcn-svelte.com/) + Tailwind CSS v4
- [SuperTokens Web JS](https://supertokens.com/docs/web-js/introduction)
- [Cloudflare Adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) (despliegue en Workers)
- [Vitest](https://vitest.dev/) + [Testing Library Svelte](https://testing-library.com/docs/svelte-testing-library/intro/)

## Arquitectura BFF

```
Browser ──► Astro (Cloudflare Worker)
              │
              ├── src/pages/api/v1/*  → BFF routes
              │                         ├── proxy simple a Go
              │                         ├── validación de input
              │                         ├── transformación de respuesta
              │                         └── caché/rate-limit si aplica
              │
              └── src/pages/dashboard/* → SSR pages
                                          ├── src/middleware.ts valida sesión
                                          └── carga componentes Svelte
```

### Principios

1. **Nunca llamar al backend Go directamente desde el cliente.** Todos los clientes en `src/lib/api/` apuntan a `/api/v1/...` (rutas locales del BFF).
2. **El BFF es un proxy transparente por defecto** (`src/pages/api/v1/[...path].ts`), pero cada dominio puede tener rutas propias cuando se necesite validación, transformación o lógica de presentación.
3. **Las cookies de sesión se reenvían automáticamente** en el proxy; el backend Go recibe la misma sesión de SuperTokens.
4. **El middleware (`src/middleware.ts`) valida la sesión server-side** antes de servir `/dashboard/*` y redirige a `/login` si no hay sesión.
5. **Los componentes reciben `user`, `role` y `firm` desde `context.locals`**, inyectados por el middleware.

## Estructura

```
src/
  middleware.ts                    # guarda de sesión para /dashboard
  pages/
    index.astro                    # landing
    login.astro                    # formulario de login
    pending-approval.astro         # usuario pendiente de aprobación
    auth/                          # callbacks de SuperTokens
    dashboard.astro                # dashboard principal
    dashboard/
      usuarios.astro               # gestión de usuarios (existe)
      clientes/                    # clientes
      casos/                       # casos legales
      etapas/                      # catálogo e historial de etapas
      conciliaciones/              # conciliación
      edictos/                     # publicaciones de edictos
      curadores/                   # curador ad-litem
      sentencias/                  # sentencia
      diligencias/                 # diligencias de embargo
      gastos/                      # gastos operativos
      catalogo/                    # catálogo de costos
      facturas/                    # facturas de proveedor
      estimados/                   # estimados de costo
      pagos/                       # pagos del deudor
      expedientes/                 # expediente digital
      alertas/                     # alertas de plazos legales
      reportes/                    # reportes
      configuracion/               # configuración del despacho
    api/v1/
      [...path].ts                 # proxy catch-all al backend Go
      auth/                        # BFF auth específico
      users/                       # BFF users
      clients/                     # BFF clients
      cases/                       # BFF cases
      casestages/                  # BFF case stages
      conciliaciones/              # BFF conciliaciones
      edictos/                     # BFF edictos
      curadores/                   # BFF curadores
      sentencias/                  # BFF sentencias
      diligencias/                 # BFF diligencias
      gastos/                      # BFF gastos
      catalog/                     # BFF cost catalog
      invoices/                    # BFF invoices
      estimates/                   # BFF estimates
      payments/                    # BFF payments
      documents/                   # BFF documents
      alerts/                      # BFF alerts
      reports/                     # BFF reports
      rights/                      # BFF data rights
      uploads/                     # BFF file uploads
      webhooks/                    # BFF ingestion webhooks
  components/
    auth/                          # forms/callbacks de autenticación
    layout/                        # DashboardLayout, navegación
    ui/                            # shadcn-svelte base
    users/                         # gestión de usuarios
    clients/                       # clientes
    cases/                         # casos
    case-stages/                   # etapas
    conciliaciones/                # conciliación
    edictos/                       # edictos
    curadores/                     # curadores
    sentencias/                    # sentencias
    diligencias/                   # diligencias
    gastos/                        # gastos operativos
    catalog/                       # catálogo de costos
    invoices/                      # facturas
    estimates/                     # estimados
    payments/                      # pagos
    documents/                     # expediente
    alerts/                        # alertas
    reports/                       # reportes
    config/                        # configuración
  lib/
    api/
      client.ts                    # BFF fetch client compartido
      users.ts                     # API de usuarios
      clients.ts                   # API de clientes
      cases.ts                     # API de casos
      invoices.ts                  # API de facturas
      ...                          # un archivo por dominio
    types/                         # modelos TypeScript compartidos
    validation/                    # esquemas de formularios
    format/                        # moneda, fechas, distancia
    stores/                        # stores Svelte
    auth/                          # helpers de SuperTokens
    supertokens/
      config.ts                    # config de SuperTokens Web JS
    utils.ts                       # helpers genéricos
  styles/
    global.css                     # estilos globales
  tests/                           # tests E2E/playwright
```

> Ver `STRUCTURE.md` para el mapeo completo a la propuesta.

## Configuración

Copiar variables de entorno:

```bash
cp .env.example .env
```

| Variable | Local | Producción |
|----------|-------|------------|
| `PUBLIC_WEBSITE_DOMAIN` | `http://localhost:4321` | `https://app.<tudominio>.com` |
| `PUBLIC_API_DOMAIN` | `http://localhost:8080` | `https://api.<tudominio>.com` |
| `PUBLIC_SUPERTOKENS_CONNECTION_URI` | URL dev de SuperTokens | misma si usas dev core |
| `PUBLIC_SUPERTOKENS_API_KEY` | API key del dev core | misma si usas dev core |

> Fase 1 usa el **dev core de SuperTokens**. Para producción real se requiere un dominio propio y un core gestionado o auto-hosteado.

## Desarrollo local

El adaptador de Cloudflare soporta `astro dev` para desarrollo local:

```bash
pnpm install
pnpm run dev
```

> En Astro 7 + `@astrojs/cloudflare` v14, `astro dev` emula el entorno de Cloudflare Workers. Para probar el Worker ya construido:
>
> ```bash
> pnpm build
> pnpm run dev:worker
> ```

## Tests

```bash
pnpm test:run
```

## Build y despliegue

```bash
pnpm build
npx wrangler deploy
```

## Convenciones

1. **Un directorio por dominio** en `components/` y `pages/dashboard/`.
2. **Cada página Astro** delega la UI a un componente Svelte principal (`<XPage>`).
3. **Cada dominio tiene un cliente** en `src/lib/api/<dominio>.ts` que consume el BFF (`/api/v1/...`) usando `src/lib/api/client.ts`.
4. **Cada dominio puede tener rutas BFF propias** en `src/pages/api/v1/<dominio>/` cuando se requiera lógica antes de llamar al backend.
5. **Los permisos se leen desde `context.locals.role`** en el middleware; los componentes reciben `user`, `role` y `firm` como props.
6. **Los montos se muestran en USD** con `DECIMAL(12,2)`; las fechas en formato local `es-SV`.
7. **Los formularios usan esquemas** en `src/lib/validation/` y reutilizan `src/lib/format/` para presentación.

## Notas

- `astro.config.mjs` usa el adaptador de Cloudflare y el output `server`.
- El middleware se ejecuta en el servidor y reenvía la cookie de sesión al backend para validar al usuario.
- Tailwind v4 se carga mediante `@tailwindcss/vite`; no se usa `@astrojs/tailwind`.
- `wrangler.toml` incluye `nodejs_compat` porque el SSR de Svelte requiere APIs de Node.js (`node:async_hooks`).
