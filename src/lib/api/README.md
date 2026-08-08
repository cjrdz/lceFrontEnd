# lib/api directory

## Shared client

- `client.ts` — BFF fetch client used by every domain client. Handles credentials, JSON headers, 401/403 redirect, and error messages.

## Existing API client

- `users.ts` — user management (uses `client.ts`).

## Future API clients (one per domain)

- `clients.ts`
- `cases.ts`
- `casestages.ts`
- `conciliaciones.ts`
- `edictos.ts`
- `curadores.ts`
- `sentencias.ts`
- `diligencias.ts`
- `gastos.ts`
- `catalog.ts`
- `invoices.ts`
- `estimates.ts`
- `payments.ts`
- `documents.ts`
- `alerts.ts`
- `reports.ts`
- `rights.ts`

## Conventions

- Each client wraps the local BFF routes (`/api/v1/...`), never the backend Go directly.
- Re-export types from `src/lib/types/` or define local DTOs here.
- Keep one exported async function per endpoint (e.g., `listClients`, `getCase`, `createInvoice`).
- Tests live next to the client as `*.test.ts`.
