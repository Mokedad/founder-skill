# Operations: Mama Fit Core Comeback (pilot)

How the pilot runs from 1 December 2026: one founder, no staff, no custom app. Sold from Instagram, delivered with no-code tools.

**How the prices were checked (read this first).** This session could not open the vendors' own pages. The network blocked stripe.com, stan.store, podia.com, vimeo.com, mailerlite.com and bunny.net. Every price below comes from web search results, dated 2026, that summarise those pages. Most are third-party reviews. Some sources disagreed, and I note where. Check each price on the official link before you pay. US$ prices are converted at an **assumed** rate of 1 USD = 1.52 AUD. Use the day's rate.

---

## Changes for the CFO

The real pilot stack costs **about A$61 a month**, against A$150 in `numbers.json`. If you add Xero for bookkeeping, it is **about A$98 a month**. Bookkeeping is not in `numbers.json` at all. I have not edited `numbers.json`. The CFO should re-run with these numbers.

| numbers.json line | Model | Real (recommended stack) | Source |
| --- | ---: | ---: | --- |
| Web app / course platform | 60 | **44** (Stan Store Creator, US$29) | stan.store/pricing, via search |
| Video hosting, private | 25 | **0** (videos inside Stan course). Use **~2** (Bunny Stream US$1 minimum) only if needed | bunny.net/pricing/stream, via search |
| Email tool | 20 | **0** (Kit free Newsletter plan, up to 10,000 subscribers) | kit.com/pricing, via search |
| Fitness liability insurance | 35 | **16** (Marsh AUSactive cover "from A$190 a year"). **Needs Cert III in Fitness or higher.** See below | au.marsh.com, via search |
| Domain, misc software | 10 | **0 to 10**. Not checked. Stan gives you a free stan.store link | not checked |
| Private group | 0 | **0** (WhatsApp community or Facebook group) | free |
| **Total** | **150** | **about 61** (60 to 70) | |
| Bookkeeping (new line) | not in model | **37** (Xero Ignite, A$37 incl. GST from 1 July 2026). A spreadsheet is A$0 for the pilot | xero.com/au, via search |
| **Total with Xero** | | **about 98** | |

Other changes for the CFO:

- **Stripe fee is right.** 1.7% + A$0.30 on a A$19.99 domestic card = **A$0.64**. One source says it may fall to 1.65% + A$0.30 (A$0.63) from 1 October 2026. Not confirmed. International cards are about 3.5% + A$0.30 (**A$1.00**), plus 2% if currency is converted.
- **New startup cost: a fitness qualification.** Insurers require Cert III in Fitness (some cover needs Cert IV). The founder is not stated to hold one. Without it she may not be insurable as a fitness professional. The course cost was not researched. Get quotes from registered training providers and add the cost to `startup`.
- **New startup cost: business name** A$47 for 1 year, or A$108 for 3 years (ASIC, from 1 July 2026, via search). ABN is free.
- **Stan Store fees.** Stan says 0% platform fee on both plans. One older review says 5%. If 5% applies, that adds A$1.00 a sale.
- **Founder time is unpaid** (about 15 to 17 hours a week for a 30-mum cohort, see People). The model has no wage line. Profit in the model is before paying the founder.

---

## 1. The daily and weekly cycle

**[C]** = the customer sees this step.

### Every day (about 2 hours, split into nap-time blocks)

1. Check overnight sales in Stan Store and Stripe. Match each sale to a cohort start date.
2. **[C]** Send each new buyer the welcome email and the group invite (SOP 1).
3. **[C]** Free quick-start sign-ups get the automatic Kit email with the 1-week quick start link.
4. **[C]** Read the cohort groups. Answer questions. Like and encourage posts (15 to 30 minutes).
5. **[C]** Scan every message for pain, leaking, bleeding or "it got worse" words. Any hit goes to SOP 3 the same day.
6. **[C]** Answer Instagram DMs and comments. Point buyers to the Stan link.
7. **[C]** Post on Instagram (one story a day, a reel 3 times a week).
8. Log anything unusual in the incident log (a simple Google Sheet).

### Every week

| Day | Step |
| --- | --- |
| Monday | **[C]** New cohort starts (SOP 5). **[C]** Week's sessions unlock in the group post. |
| Wednesday | **[C]** Mid-week nudge in each group: "Did you do session 2?" |
| Friday | **[C]** Weekly check-in to every active mum (SOP 2). |
| Saturday | Read check-in replies. Flag anyone silent 2 weeks in a row for a personal message. |
| Sunday | Admin: refunds (SOP 4), bookkeeping, cash to tax account, plan next week's posts. Close sales for Monday's cohort at 8pm. |

### Every month

- Reconcile Stripe payouts to the bank and the sales sheet.
- Review the incident log with the physio (15 minutes, if she agrees).
- Check tool bills against this file.
- Check the refund rate against the CFO's 10% reserve.

---

## 2. Suppliers and tools

### Recommended pilot stack

| Job | Tool | Published price (as found) | Why | Link |
| --- | --- | --- | --- | --- |
| Take payment | Stripe (through Stan Store) | 1.7% + A$0.30 per domestic card. About 3.5% + A$0.30 international, plus 2% conversion | Australian rate, payouts to an AU bank, refunds in one click | https://stripe.com/au/pricing |
| Store and course delivery | Stan Store, Creator plan | US$29 a month or US$300 a year. 14-day free trial, no free plan. Says 0% platform fee | Built for selling from an Instagram bio link. Holds the course videos. One login for the founder | https://stan.store/pricing |
| Email | Kit, free Newsletter plan | US$0 up to 10,000 subscribers (Creator plan US$39 a month if automations are needed later) | Free welcome email and quick-start email. Stan Creator's own email is limited | https://kit.com/pricing |
| Private group per cohort | WhatsApp community (one group per weekly cohort) or a private Facebook group | Free | Mums already use them. No new app to learn | https://faq.whatsapp.com |
| Bookkeeping | Spreadsheet in the pilot. Xero Ignite once sales are steady | Xero Ignite A$37 a month incl. GST from 1 July 2026 (limit about 20 invoices and 5 bills a month). Intro deals seen at A$3.50 a month for a few months | Stripe and Xero link automatically. Your accountant will know it | https://www.xero.com/au/pricing-plans/ |
| Insurance | AUSactive member cover via Marsh, or Guild (AUSactive partner), or BizCover / Gallagher (FITREC) | Marsh: "from A$190 a year". A guide says A$150 to A$600 a year for public liability plus professional indemnity | Covers advice and injury claims. **Needs a fitness qualification** | https://www.au.marsh.com/sport/ausactive.html · https://www.guildinsurance.com.au/fa-link |

### Alternatives checked

| Job | Option | Published price (as found) | Note | Link |
| --- | --- | --- | --- | --- |
| Course platform | Podia Mover / Shaker | US$49 / US$99 a month (after a June 2026 increase; older guides say US$39 / US$89). Mover takes 5% a sale | Mover costs more than Stan and takes 5% | https://www.podia.com/pricing |
| Course platform | Teachable | From about US$39 a month, with a 7.5% fee on Starter. Builder (no fee) about US$69 | Fee hurts at A$19.99 | https://teachable.com/pricing |
| Course platform | Thinkific | Entry plan about US$40 to US$54 a month (sources disagree after an August 2026 increase). No free plan | Good, but more than the pilot needs | https://www.thinkific.com/pricing/ |
| Course platform | Kajabi Basic | About US$179 a month (US$143 annual). Entry plan dropped in January 2026 | Far too expensive for the pilot | https://kajabi.com/pricing |
| Video hosting | Vimeo Starter / Standard | Sources disagree: Starter about US$12 (annual) to US$20 (monthly). Standard about US$25 to US$41. Domain-level privacy seems to need Standard | Only if Stan's video player is not good enough | https://vimeo.com/upgrade |
| Video hosting | Bunny Stream | Pay as you go. Storage from US$0.01 a GB, delivery from US$0.005 to US$0.01 a GB, US$1 a month minimum, free encoding | Cheapest private hosting. Needs a little setup | https://bunny.net/pricing/stream/ |
| Email | MailerLite | Free plan cut to 250 subscribers in mid-2026. Paid from about US$12 a month (sources disagree on plan names) | Kit's free plan is larger | https://www.mailerlite.com/pricing |
| Group | Circle Professional | US$89 a month (annual) or about US$129 monthly, plus 2% of sales | Not needed for a pilot | https://circle.so/pricing |

### The women's health physio (the key supplier)

- Search the APA "Find a physio" directory at **https://choose.physio**. Filter by "Women's, men's and pelvic health" and your area. Everyone listed is an APA member.
- APA's Women's, Men's and Pelvic Health national group: https://australian.physio/membership/national-groups/womens-mens-and-pelvic-health
- The Continence Foundation of Australia also lists pelvic health physios: https://www.continence.org.au
- Ask 2 or 3 for a written quote for: (a) a full review of 8 weeks of sessions plus the self-check video, (b) being named on the program, (c) being the referral point for SOP 3, (d) a 15-minute monthly incident review. The CFO's A$1,500 is an estimate. Only a quote will tell. Payment terms and lead time: ask.
- Check her registration on the AHPRA public register: https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx
- She must follow AHPRA's advertising rules when she is named. Ask her to check the sales page and any testimonials (see licences).

### Equipment

The CFO's A$400 filming kit (tripod, mic, light) was not priced here. Any phone tripod, clip-on mic and ring light from a major retailer will do. Get two prices before buying.

---

## 3. People

There is one person: the founder. **Her time is unpaid.** The model has no wage for her, so profit is before paying her.

### Weekly hours for one 30-mum cohort

| Task | Hours a week |
| --- | ---: |
| Onboarding new buyers (SOP 1, about 5 minutes each, 30 mums spread over the sales weeks) | 2.5 |
| Group moderation and replies (30 minutes a day) | 3.5 |
| Weekly check-in, sending and replying (about 3 minutes a mum) | 1.5 |
| Pain and leaking reports, refunds, hard DMs | 1.0 |
| Instagram posts, reels, DMs (selling the next cohort) | 5.0 |
| Weekly cohort start (SOP 5) | 1.0 |
| Admin, bookkeeping, tool checks | 1.0 |
| **Total** | **about 15.5** |

- Slow first month (3 to 10 buyers): about 8 to 10 hours a week. Most of it is Instagram.
- **Watch the load.** At the CFO's plan of 1 sale a day, about 30 new mums start each month and each stays 8 weeks. That means about 60 mums active at once, and check-ins and moderation roughly double (about 20 to 22 hours a week). The cap of 30 per founding group is what keeps this doable alone.
- **Cover when she is sick or the kids are:** pre-write the check-in and nudge messages, and schedule them. Keep a "back in 48 hours" post ready. The only thing that cannot wait is a pain or leaking report (SOP 3).
- No staff, so no payroll. If she ever pays a helper, wages, super and workers' compensation apply. Ask the accountant first.

---

## 4. SOPs

### SOP 1: New buyer onboarding (same day, 5 minutes a buyer)

1. Stripe/Stan sends the receipt and course access automatically. Check it arrived (Stan dashboard shows the sale).
2. Add the buyer to the sales sheet: name, email, Instagram handle, date bought, cohort start date (the next Monday).
3. **[C]** Send the welcome email (saved template): start date, how to log in, the 4 sessions a week, the safety note, the 14-day refund promise, and the group invite link.
4. **[C]** Safety note, in every welcome: "If you are under 6 weeks postpartum, had a caesarean or a complicated birth, or have pain, leaking, heaviness or bleeding, please get clearance from your GP or a women's health physio before you start."
5. **[C]** Ask her to watch the diastasis self-check video first and to reply "ready".
6. Add her to the cohort's WhatsApp/Facebook group once she joins via the link. Remove any stranger.
7. If she does not join the group within 3 days, send one friendly reminder. Then leave it.

### SOP 2: Weekly check-in (every Friday, about 90 minutes for 30 mums)

1. Open the sales sheet. Filter to active mums (weeks 1 to 8).
2. **[C]** Post the check-in in each cohort group, and DM anyone who prefers private: "How many sessions did you do this week (0 to 4)? Anything feel hard, sore or not right? One win?"
3. Saturday: log each answer (sessions done, any flag) in the sheet.
4. Any pain, leaking, heaviness or "worse" answer: go to SOP 3 now, not later.
5. **[C]** Reply to everyone by name, one line each. Praise effort, not body shape.
6. Anyone at 0 sessions for 2 weeks: **[C]** send a personal message: "Pick up where you left off: here's this week's first session." No guilt.
7. Never give medical advice. Never comment on someone's gap size as a diagnosis.

### SOP 3: Pain or leaking report = stop and refer to the physio (same day)

Trigger words: pain, hurts, leaking, leaked more, heaviness, dragging, bulge, doming that is worse, bleeding, dizzy.

1. **[C]** Reply within the same day, privately, not in the group: "Thank you for telling me. Please stop the program for now. This needs a women's health physio to check, not me."
2. **[C]** Give her the referral: the program's named physio (if she takes clients), or find one at https://choose.physio (filter women's, men's and pelvic health), or her GP.
3. **[C]** Urgent signs (heavy bleeding, chest pain, severe pain, fever, signs of infection at a wound): "Please call 000 or go to emergency now." For advice: healthdirect 1800 022 222. Continence questions: the National Continence Helpline via https://www.continence.org.au.
4. Do **not** diagnose, suggest exercises to "fix" it, or tell her to push through.
5. Pause her: note "paused – referred" and the date in the sheet.
6. **[C]** Offer a full refund, even if it is after 14 days. Say she can come back free to a later cohort once a physio clears her.
7. Write it in the incident log: date, what she said (her words), what you said, outcome. Keep it private. This is health information (see Privacy).
8. Tell the program physio within 48 hours (no name needed unless the mum agrees). If two mums report the same exercise, take that exercise out until the physio has checked it.
9. Call your insurer if she says she was injured or mentions a claim.

### SOP 4: Refund request (within 2 business days)

1. Check the date. Within 14 days of purchase: refund in full, no questions (your promise).
2. After 14 days: if the program was faulty or not as described (videos broken, not what the page said), the Australian Consumer Law may still give her a refund. Your 14-day promise is on top of her legal rights, not instead of them. If unsure, refund. A$19.99 is not worth a dispute.
3. Refund in Stripe (or Stan) to the original card. Do not refund by bank transfer.
4. **[C]** Send a kind one-line confirmation. Optionally ask one question: "What would have made it work for you?"
5. Remove her course access and group membership.
6. Log it in the sales sheet with the reason. Check the monthly refund rate against the 10% reserve.
7. A card chargeback (dispute) is not a refund request. Answer it in Stripe with the receipt and access log within the deadline Stripe gives.

### SOP 5: Weekly cohort start (Sunday 8pm to Monday 9am)

1. Sunday 8pm: close sales for this cohort. Later buyers go to next Monday.
2. Create the new cohort group ("Core Comeback – starts 1 Dec"). Set rules: kind words, no body shaming, no medical advice between members, pain or leaking goes straight to the founder.
3. Check that everyone in the sales sheet for this start date has the invite (SOP 1).
4. **[C]** Monday 7am: post the welcome: who you are, who the physio is, the safety note, this week's 4 sessions, and "reply with your baby's age and your goal".
5. **[C]** Post the diastasis self-check video and the first session link.
6. Check the course videos all play on a phone (one test login).
7. Put Wednesday's nudge and Friday's check-in in the calendar for this cohort, for all 8 weeks.
8. Close the group 2 weeks after week 8 ends, with a goodbye and a link to the next offer (if any).

---

## 5. Licences, permits and insurance (Australia)

**Rules differ by situation and change. Confirm each item with the authority or a professional (an accountant, a lawyer, an insurance broker). This is not legal advice.** These official pages could not be opened from this session. Links are to the official sites.

- [ ] **ABN.** Free from the Australian Business Register. Never pay a third-party site for it. Have your TFN and ID ready. https://www.abr.gov.au
- [ ] **Business name.** Needed if you trade under "Mama Fit" and not your own name. A$47 for 1 year, A$108 for 3 years (from 1 July 2026, from search; check ASIC). https://asic.gov.au/for-business/registering-a-business-name/
- [ ] **GST.** You must register once GST turnover reaches A$75,000 a year (current or projected). Below that, it is optional. Turnover means sales, not profit. https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst · https://business.gov.au/registrations/register-for-taxes/register-for-goods-and-services-tax-gst
- [ ] **Income tax.** As a sole trader, profit goes on your personal tax return. Put about 30% of profit aside. Ask your accountant. https://www.ato.gov.au
- [ ] **Fitness qualification and registration.** Australia has no law that says you need a licence to sell a workout program. But insurers want one. Marsh's AUSactive policy says cover needs at least **Certificate III in Fitness**. Guild says some group or outdoor work needs **Certificate IV in Fitness**. AUSactive keeps the national register of exercise professionals, and insurers, gyms and venues recognise it. https://ausactive.org.au/membership/professional-plus/
- [ ] **Liability insurance (public liability and professional indemnity).** Not legally required, according to Guild, but strongly advised for exercise advice to postpartum women. Marsh (AUSactive): "from A$190 a year". Ask a broker whether an **unqualified** founder can be covered, and whether the physio's review changes that. https://www.au.marsh.com/sport/ausactive.html · https://www.guildinsurance.com.au/fa-link
- [ ] **Refunds: Australian Consumer Law.** Consumer guarantees apply to online purchases and services: provided with due care and skill, fit for purpose, as described. Your 14-day promise must sit on top of these rights. Never write "no refunds after 14 days" for faults. Change-of-mind refunds are not required by law, but you have chosen to offer one for 14 days, so you must honour it. https://www.accc.gov.au/business/selling-products-and-services/small-business-toolkit/consumer-rights-and-guarantees/introduction
- [ ] **Health claims in ads.** The TGA Advertising Code covers therapeutic goods. A workout program is probably not a therapeutic good, but this was not confirmed. Do not make therapeutic claims ("fixes diastasis", "cures leaking", "closes your gap"). Misleading claims are banned under the Australian Consumer Law anyway. https://www.tga.gov.au/resources/guidance/applying-advertising-code-rules-testimonials-and-endorsements · https://www.accc.gov.au
- [ ] **Naming the physio.** She is a registered health practitioner. Under the National Law, testimonials cannot be used to advertise a regulated health service. Ask her (and the APA guidelines) whether mum testimonials can sit on a page that names her. https://www.ahpra.gov.au/Resources/Advertising-hub.aspx · https://australian.physio/inmotion/advertising-guidelines
- [ ] **Privacy.** Small businesses under A$3 million turnover are usually exempt. But the OAIC says any business that provides a **health service** and holds **health information** is covered regardless of turnover. A health service includes activities that assess, keep or improve physical health. Collecting gap sizes, leaking or pain reports may put you in. Assume you are covered: write a privacy policy, collect the minimum, keep the incident log private, and do not discuss health in the open group. https://www.oaic.gov.au/privacy/privacy-for-organisations/small-business
- [ ] **Terms and disclaimer.** Terms of sale, a health disclaimer and a screening question at checkout ("I have clearance from my GP or physio / I am at least 6 weeks postpartum"). The CFO has A$300 for templates. A lawyer should check them.
- [ ] **Music and images.** Use only licensed music in the videos and reels.

---

## 6. Risk register

Likelihood and impact: Low, Medium, High.

| # | Risk | Likelihood | Impact | Plan |
| --- | --- | --- | --- | --- |
| 1 | A mum reports pain or more leaking, or is hurt | Medium | High | SOP 3 the same day. Physio-reviewed program with easier options. Screening at checkout. Insurance in place before the first sale. Incident log. |
| 2 | Founder cannot get insured without a fitness qualification | High | High | Ask a broker this week. If no, start Cert III/IV, or have the physio or a qualified trainer co-deliver, or delay launch. Do not sell without cover. |
| 3 | No physio agrees, or the quote is far above A$1,500 | Medium | High | Contact 3 to 5 via choose.physio now. Offer a smaller scope (review only, not named) as fallback. Do not launch the "physio-reviewed" claim until she has signed off in writing. |
| 4 | Founder sick, or a child is sick, for a week | High | Medium | Pre-scheduled check-ins and nudges. A "back in 48 hours" post. Keep SOP 3 as the one task that cannot wait (phone alerts on). |
| 5 | Founder burnout as cohorts overlap (60+ active mums) | Medium | High | Keep the 30 cap. Track hours weekly. Templates for every reply. Stop selling new cohorts if hours pass 20 a week. |
| 6 | Instagram ads cost far more than A$6 a buyer, or the account is restricted | High | High | Pre-sale tests cost per buyer first. Build the email list (Kit) so sales do not depend on one app. Keep a backup admin on the account with 2-factor login. |
| 7 | Videos leak or get shared for free | Medium | Low | Host inside Stan, not YouTube. Watermark with the brand. The group and check-ins are what buyers pay for. Accept some sharing. |
| 8 | A tool goes down or raises its price (Stan, Stripe, WhatsApp) | Medium | Medium | Keep the original video files and the buyer list (sales sheet) outside the tools. Monthly bill check. Podia, Thinkific or Bunny are the fallbacks. |
| 9 | Refunds or chargebacks pass the 10% reserve | Medium | Medium | SOP 4. Track monthly. Ask every refunder why. Fix the top reason in the next cohort. |
| 10 | A misleading health claim or a privacy slip (health details posted in the group) | Medium | High | No "fix" or "close" claims. Physio checks the sales page. Health talk moves to private messages. Privacy policy live before launch. |

---

## Open questions

1. Insurance: can the founder be insured without Cert III/IV? Price? (broker)
2. Physio: written quotes from 2 or 3 women's health physios.
3. Fitness qualification: course cost and time, if needed.
4. Official prices: re-check Stan, Stripe, Kit, Xero and Bunny on their own pages (this session could not open them).
5. Does Stan Store's video player give enough privacy, or is Bunny Stream needed?
6. Accountant: sole trader set-up, tax set-aside, and whether to use Xero from day one.

Next: `/founder-launch`.
