# Architecture: Nap Strong

## Stack

Two stages. The prototype ships now; the production stack replaces only the data layer.

| Layer | Prototype (now) | Production (after the pre-sale) | Why |
| --- | --- | --- | --- |
| Web app | Vite + React + TypeScript, mobile-first PWA | Same | Small, fast, installs from the browser; no app store cut |
| Styling | CSS custom properties from `design/tokens.json` | Same | One source of truth, light and dark |
| Routing | Hash routes (`#/today`) | Same, or a router | Works on any static host |
| Data | `src/store.ts`: localStorage behind async functions | Supabase (Postgres + Auth) behind the **same function signatures** | Swapping the store changes no screen code |
| Payments | Simulated unlock, clearly labelled, no card fields | Stripe Checkout one-off payment + webhook sets `paid` | Never build card forms |
| Video | Text cues + timers; video slot per exercise | Bunny Stream or Mux, private, downloadable | Filming and physio sign-off first |
| Email | none | Resend: welcome, weekly check-in, refund | |
| Hosting | Any static host (Artifact preview for now) | Vercel or Netlify on the founder's domain | |

## Schema (production, Postgres)

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  weeks_postpartum int not null check (weeks_postpartum between 0 and 104),
  birth_type text not null check (birth_type in ('vaginal','caesarean')),
  gp_cleared boolean not null,
  symptoms text[] not null default '{}',
  red_flags text[] not null default '{}',
  minutes int not null default 15 check (minutes in (5,15,20)),
  paid_at timestamptz,
  cohort_week date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  day int not null check (day between 1 and 32),
  version text not null check (version in ('full','short')),
  easier_moves text[] not null default '{}',
  pain_moves text[] not null default '{}',
  completed_at timestamptz not null default now(),
  unique (user_id, day)
);
create table feels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  day int not null,
  leaking boolean not null, doming boolean not null, pain boolean not null,
  effort text not null check (effort in ('too_easy','right','too_hard')),
  created_at timestamptz not null default now()
);
create table self_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  width_fingers numeric(2,1) not null check (width_fingers between 0 and 5),
  doming boolean not null,
  created_at timestamptz not null default now()
);
create index on sessions (user_id, day);
create index on feels (user_id, created_at);
create index on self_checks (user_id, created_at);
-- Row level security on every table: auth.uid() = user_id (or id on profiles).
```

Symptom data is health information: private by default, never shown in the group, exportable and deletable (Privacy Act; see `founder/ops.md`).

## API (production)

| Route | What | Who |
| --- | --- | --- |
| Supabase client: profiles, sessions, feels, self_checks | read and write own rows | signed-in mum (RLS) |
| `POST /api/checkout` | create a Stripe Checkout session for the 8-week program | signed-in mum |
| `POST /api/stripe-webhook` | `checkout.session.completed` → set `paid_at`; `charge.refunded` → clear it. Verify signature, store event id, idempotent | Stripe |
| `POST /api/delete-account` | delete auth user and all rows | signed-in mum |

## Parts that bite

- Safety logic must be conservative and physio-approved; the prototype's rules are drafts.
- Time zones: days are counted by sessions done, not calendar days, so missed days never break anything.
- Refunds: webhook must re-lock the program.
- Offline: videos need download rights from the video host.

## Build order

1. Vertical slice: S02 quick check → S05 today → S06 player → S07 feel → S05.
2. Must-haves: S01, S03, S04, S08, S09, S12, S13.
3. Should-haves: S10 group, S11 check-in, adaptation rules, C-section path.
4. Production backend (replica-backend) once the pre-sale passes.
