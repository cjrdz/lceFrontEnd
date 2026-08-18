# BFF routes (`src/pages/api/v1/`)

Esta carpeta contiene las rutas Astro que actúan como **Backend for Frontend**.

- `[...path].ts` (catch-all) reenvía cualquier request a `/api/v1/*` hacia el backend Go,
  preservando cookies, headers relevantes y método HTTP.
- Cada dominio puede añadir rutas propias (`index.ts`, `[...path].ts`, `[id].ts`) para:
  - Validar input antes de enviar al backend.
  - Transformar/enriquecer la respuesta para la UI.
  - Aplicar caché o rate-limit.
  - Manejar subidas de archivos o webhooks.
- Los clientes en `src/lib/api/` siempre apuntan a rutas locales (`/api/v1/...`), nunca al backend directamente.

## Convenciones

- Una carpeta por dominio, nombrado igual que el paquete backend.
- Cada archivo exporta `GET`, `POST`, `PUT`, `PATCH`, `DELETE` según corresponda.
- Las rutas BFF deben mantener el mismo path y verbo que el backend Go, salvo transformación justificada.
- Errores del backend se propagan al cliente con el mismo status code y body.
