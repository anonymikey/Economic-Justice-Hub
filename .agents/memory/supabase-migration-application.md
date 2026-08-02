---
name: Supabase migration application
description: New Supabase projects may require manual SQL Editor execution when no Supabase management SQL channel is available in the workspace.
---

The repository can contain and validate an idempotent Supabase migration, but the workspace may not have a management API or SQL execution channel for applying it to the hosted project. Confirm live table availability through the Supabase REST endpoint before calling backend setup complete.

**Why:** During backend initialization, credentials and Auth connectivity worked while every application table returned 404 until the migration is run in the hosted project's SQL Editor.

**How to apply:** Run the checked-in migration in the target Supabase project's SQL Editor, then verify the expected tables through REST and exercise anonymous, member, admin, and service-role paths.

PostgREST writes using `Prefer: return=representation` also require a matching SELECT policy; use `return=minimal` when testing an insert whose table is intentionally unreadable to the caller.

**Why:** An anonymous contact insert initially appeared to fail with 401 because the verification requested a returned representation, while the actual minimal-response insert succeeded under the intended policy.

**How to apply:** Separate write-policy checks from read-policy checks and choose the response preference accordingly.