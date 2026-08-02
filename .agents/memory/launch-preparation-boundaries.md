---
name: Launch preparation boundaries
description: Production launch work is split between checked-in app preparation and externally managed provider configuration.
---

The EJF launch path keeps application code changes separate from production-provider changes: Vercel owns frontend variables/deployment, Cloudflare owns DNS/SSL, and Supabase owns Auth, Storage, and database settings. Code can safely ship optional hooks and checked-in migrations, but provider dashboards and production variables require an explicit launch operation.

**Why:** The project explicitly uses external production infrastructure and requested preparation/verification without modifying deployment, DNS, or environment configuration.

**How to apply:** Before declaring launch complete, verify the external Turnstile secret/site key, Google OAuth callback/provider settings, Supabase Storage migration/policies, and Vercel variables independently. Resend remains optional until its connection is authorized.