# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/ejf-website) — served at `/`
- **API framework**: Express 5 (artifacts/api-server) — served at `/api`
- **Database**: PostgreSQL + Drizzle ORM (local), Supabase (production)
- **Authentication**: Supabase Auth (`@supabase/supabase-js`) — email/password sign-up & sign-in
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle for API server)

## Running on Replit

The frontend dev server runs via the "Start application" workflow:
- Command: `pnpm --filter @workspace/ejf-website run dev`
- Port: 3000 (reads from `PORT` env var)
- Host: 0.0.0.0 (required for Replit proxy)

The API server can be run separately:
- Command: `pnpm --filter @workspace/api-server run dev`
- Port: 8080

## Environment Variables

- `VITE_SUPABASE_URL` — Supabase project URL (set in `.replit` userenv)
- `VITE_SUPABASE_ANON_KEY` — Supabase public anon key (set in `.replit` userenv)

## Key Commands

- `pnpm install` — install all workspace dependencies
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/ejf-website run dev` — run frontend locally

## Artifact Structure

- `artifacts/ejf-website/` — React + Vite frontend (Economic Justice Forum website)
- `artifacts/api-server/` — Express 5 API server
- `lib/` — shared libraries (db, api-spec, api-zod, api-client-react)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
