# Recon map: Nap Strong (postpartum strength web app)

## Sources

| Source | Used for |
| --- | --- |
| Postpartum App Draft doc (https://claude.ai/artifact/NHVDuYoZNJHCH9CbvrH2PN) | Screens, flows, features (our own design) |
| `replica/recon-lite.md` | Every Mother's public feature list, from search summaries |
| `founder/` pack (panel, offer, ops, brand) | Objections, safety rules, brand |

Every Mother's own pages, store listing and app were blocked from this session. **Nothing was taken from Every Mother's app, code, copy, videos or design.** This is our own product, built from our own draft; Every Mother only informs which features are table stakes.

## Scope

- Platform: mobile-first web app (PWA), Australia.
- Slice: the core loop. Quick check → today's 15-minute session → how did it feel → progress, plus the free week → unlock.
- For: the founder's own business.

## Screens

| ID | Screen | Route | Purpose | Key components | States |
| --- | --- | --- | --- | --- | --- |
| S01 | Welcome | `#/` | Landing from Instagram | Hero, founder note, physio note, start button | first visit, returning (go to Today) |
| S02 | Quick check | `#/check` | Safe starting point | Stepper, choice chips, number input | each step, back, validation error |
| S03 | See a physio first | `#/physio` | Stop red-flag answers | Reasons list, physio finder link | which flags triggered |
| S04 | Tummy gap self-check | `#/self-check` | Baseline and repeat | Steps, finger-width picker, doming yes/no | first, repeat, due |
| S05 | Today | `#/today` | Home | Session card, week progress, check-in card, nav | free week, locked day, done today, program finished |
| S06 | Session player | `#/session/:day` | Follow along | Exercise card, timer, easier option switch, "this hurts", 5-minute version | running, paused, easier, stopped for pain, done |
| S07 | How did it feel? | `#/feel/:day` | Adapt next session | One-tap chips | saved |
| S08 | Program map | `#/program` | 8 weeks | Week list, day dots | locked, done, current |
| S09 | Progress | `#/progress` | Show change | Self-check history, symptom trend, sessions done | empty, filled |
| S10 | My group | `#/group` | Mums starting the same week | Post list, composer | empty, filled (prototype: local only) |
| S11 | Weekly check-in | `#/checkin` | Founder's Friday message and reply | Message, one-question reply | not yet, answered |
| S12 | Unlock | `#/unlock` | After the free week | Price, what's included, refund line, pay button | free week done, already paid |
| S13 | Account | `#/account` | Settings, privacy | Reminder time, session length, export, delete | normal, confirm delete |

## Flows

```
F01 First visit to first session
    S01 → S02 (5 steps) → S04 → S05 → S06 → S07 → S05
    edge: red flag → S03; no GP clearance → S03; under 6 weeks → S03
    happy path: 9 taps to start the first exercise
F02 Daily session
    S05 → S06 → S07 → S05
    edge: "this hurts" mid-session → stop, log, offer easier option or rest; leaking or doming twice on a move → easier option by default + physio suggestion
F03 Missed days
    S05 shows the next unfinished day, never resets
F04 Free week to unlock
    after day 4 → S05 shows unlock card → S12 → pay (prototype: simulated) → weeks 2 to 8 open
F05 Self-check every 2 weeks
    S05 shows "self-check due" → S04 → S09
F06 Delete my data
    S13 → confirm → everything cleared → S01
```

## Components

Button (primary, secondary, ghost, danger), Chip (single, multi), Stepper header, Card, Session card, Exercise card, Timer ring, Toggle, Progress dots, Bottom nav, Notice (info, warning), Text input, Number picker, Dialog (confirm).

## Data model (inferred from our own flows)

```
Profile   weeksPostpartum, birthType (vaginal | caesarean), gpCleared, symptoms[], minutes (5 | 15 | 20),
          redFlags[], startedAt, paid (bool), cohortWeek
          confidence: high (our design)
Session   day (1..32), completedAt, version (full | short), easierMoves[], stoppedForPain (bool)
Feel      day, leaking, doming, pain, effort (too easy | right | too hard)
SelfCheck date, widthFingers (0..4), doming (bool)
Post      id, text, createdAt (group, local only in prototype)
CheckIn   week, message, reply
```

## Feature matrix

`replica/features.csv`. `original` = does Every Mother have it, from search summaries (unclear = couldn't confirm).

## Out of scope (skip rows)

Every Mother's videos, program content, clinical trial claims and brand. Real payments, accounts and a real group need the founder's own Stripe and Supabase accounts (replica-backend). Exercise content is placeholder text until the physio writes or approves it.

## Size

13 screens, 6 flows, 6 entities. Hard parts: adapting sessions safely, offline video later, payments. Prototype with a local data layer: **S (a weekend)**. Real backend and videos: **M (a few weeks)**.
