# Bugs: Nap Strong prototype

| ID | Severity | What | Status |
| --- | --- | --- | --- |
| B1 | S2 | Redoing the quick check reset the unlock and start date | Fixed before release: `saveProfile` keeps `paidAt`, `startedAt`, `reminder`; covered by the "Redo quick check keeps payment" test |
| B2 | S3 | `#/session/5?short` parsed as day NaN | Fixed: router strips the query; `hasFlag()` reads it |

No open S1 or S2 bugs. Test-script mistakes found while writing the tests (not app bugs): checks ran before the screen rendered; the start button is correctly named "Do another session" after a session that day; the first move (breathing) correctly stays on its normal version.
