# Supabase setup (funding applications)

1. Create or open a Supabase project.
2. Copy **Project URL** and **anon public** key from Project Settings → API.
3. Create `.env.local` in the repo root (see `.env.example`).
4. Run `schema.sql` in the Supabase SQL Editor.
5. Authentication → Users → Invite OCR staff by email (magic link sign-in).
6. Restart `npm run dev`.

Staff review UI: `/funding/applications`

Public applicants insert rows as `anon`. Only signed-in staff can read or update them.
