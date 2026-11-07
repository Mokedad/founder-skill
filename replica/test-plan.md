# Test plan and results: Nap Strong prototype

Automated click-through: `nap-strong/e2e/flows.cjs` (Playwright, Chromium, 390x844). Run with the app served:
`cd nap-strong && npm run build && npx vite preview --port 4173` then `node e2e/flows.cjs http://localhost:4173/ ../replica/clone-screens`.

**Result (7 Nov 2026): 27 passed, 0 failed.**

| Case | What | Result |
| --- | --- | --- |
| F01-N1 | Under 6 weeks, not cleared → physio screen with reasons | pass |
| F01-N2 | Physio hold blocks Today | pass |
| F01-H1 | Quick check → self-check → Today | pass |
| F02-E1/E2 | "This hurts" stops the move; easier option switches on | pass |
| F02-E3 | Pain preselected on the feel screen | pass |
| F02-E4 | Two flagged sessions → care notice | pass |
| F02-E5a/b | Breathing move stays normal; core move starts easier | pass |
| F02-E6 | 5-minute version has 2 moves | pass |
| F04-H1/N1/H2 | Free week → unlock card; session 5 locked; open after unlock | pass |
| F03-N1 | Can't jump ahead to session 20 | pass |
| S08, S09 | Program dots and progress count | pass |
| S10, S11 | Group post; check-in reply | pass |
| — | Data persists after reload | pass |
| — | Redoing the quick check keeps the unlock | pass |
| F06 | Delete my data → welcome | pass |
| — | Keyboard focus reaches the start link | pass |
| — | Dark mode background | pass |
| — | No horizontal scroll at 320 px and 1440 px | pass |
| — | No console errors across all flows | pass |

Not automated (manual, for the production version): real payments and refunds, emails, offline video, screen reader pass, OAuth.
