---
name: Frontend API routing
description: The frontend and separately deployed Express API require an explicit production connection.
---

The production frontend must either call the Render API with an explicit base URL or use an explicit Vercel-to-Render rewrite. A catch-all SPA rewrite to `index.html` is not an API proxy.

**Why:** The frontend contact and newsletter requests are relative `/api/...` paths, while the Express API is deployed on a separate domain.

**How to apply:** For direct browser-to-API calls, use `VITE_API_BASE_URL` with the production Render origin and allow both production frontend origins in the API's `APP_ORIGINS`. Do not assume a Vercel SPA rewrite forwards API requests.