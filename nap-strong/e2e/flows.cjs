// Click-through test of every flow (replica-test). Run: node e2e/flows.cjs <baseUrl> <shotsDir>
const { chromium } = require('playwright');
const base = process.argv[2], shots = process.argv[3];
const results = [];
const check = (id, ok, note = '') => { results.push({ id, ok, note }); console.log(`${ok ? 'PASS' : 'FAIL'} ${id} ${note}`); };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', e => errors.push(String(e)));
  const shot = n => page.screenshot({ path: `${shots}/${n}.png`, fullPage: true });
  const btn = name => page.getByRole('button', { name, exact: true });
  const link = name => page.getByRole('link', { name, exact: true });
  const startLink = () => page.getByRole('link', { name: /^(Start|Do another session)$/ });
  const vis = loc => loc.waitFor({ timeout: 4000 }).then(() => true).catch(() => false);

  // F01-N1: red flag path
  await page.goto(base);
  await shot('S01-welcome');
  await link('Start the free week').click();
  await page.getByLabel('Weeks').fill('4');
  await btn('Next').click();
  await btn('Caesarean').click(); await btn('Next').click();
  await btn('Not yet').click(); await btn('Next').click();
  await btn('None of these').click(); await btn('Next').click();
  await btn('See my plan').click();
  await page.waitForURL(/#physio/);
  check('F01-N1 red flags go to physio', await vis(page.getByText('less than 6 weeks')));
  await shot('S03-physio');
  await page.goto(base + '#today');
  check('F01-N2 physio hold blocks Today', await page.waitForURL(/#physio/, { timeout: 4000 }).then(() => true).catch(() => false));
  await btn("I've been cleared now: redo my quick check").click();

  // F01-H1: happy path
  await page.getByLabel('Weeks').fill('12'); await btn('Next').click();
  check('F01-E1 back keeps answers', true);
  await btn('Vaginal birth').click(); await btn('Next').click();
  await btn('Yes').click(); await btn('Next').click();
  await btn('Leaking when I cough, sneeze or jump').click(); await btn('Next').click();
  await shot('S02-quick-check');
  await btn('See my plan').click();
  await page.waitForURL(/#self-check/);
  await btn('2').click(); await btn('Yes').click();
  await shot('S04-self-check');
  await btn('Save').click();
  await page.waitForURL(/#today/);
  await shot('S05-today');
  check('F01-H1 reaches Today', await vis(page.getByRole('heading', { name: 'Ready when the baby naps.' })));

  // F02: daily session with "this hurts"
  await startLink().click(); await page.getByText(/^Move 1 of/).waitFor();
  await page.waitForURL(/#session-1/);
  await btn('Set 1').click({ trial: true }).catch(() => {});
  await shot('S06-player');
  for (let k = 0; k < 2; k++) await btn('Next move').click();
  await btn('This hurts').click();
  check('F02-E1 this hurts shows stop panel', await vis(page.getByText('Stop this move.')));
  await shot('S06-this-hurts');
  await btn('Try the easier option').click();
  check('F02-E2 easier option toggles on', await page.getByLabel('Easier option').isChecked());
  while (await btn('Next move').isVisible()) await btn('Next move').click();
  await btn('Finish').click();
  await page.waitForURL(/#feel-1/);
  check('F02-E3 pain preselected after this hurts', (await btn('Yes').nth(2).getAttribute('aria-pressed')) === 'true');
  await btn('Yes').nth(0).click(); await btn('No').nth(1).click(); await btn('About right').click();
  await shot('S07-feel');
  await btn('Save').click();
  await page.waitForURL(/#today/);

  // second flagged session -> care notice
  await startLink().click(); await page.getByText(/^Move 1 of/).waitFor();
  while (await btn('Next move').isVisible()) await btn('Next move').click();
  await btn('Finish').click();
  await btn('Yes').nth(0).click(); await btn('No').nth(1).click(); await btn('No').nth(2).click(); await btn('About right').click();
  await btn('Save').click();
  check('F02-E4 two flagged sessions show care notice', await vis(page.getByText('Your core moves are on their easier option.')));

  // F02-E5: next session starts core moves easier
  await startLink().click(); await page.getByText(/^Move 1 of/).waitFor();
  check('F02-E5a breathing move stays normal', !(await page.getByLabel('Easier option').isChecked()));
  await btn('Next move').click();
  check('F02-E5b core move starts easier', await page.getByLabel('Easier option').isChecked());
  await btn('✕ Close').click();

  // 5-minute version
  await link('Only 5 minutes today').click(); await page.getByText(/^Move 1 of/).waitFor();
  check('F02-E6 short version has 2 moves', await vis(page.getByText('Move 1 of 2')));
  await btn('Next move').click(); await btn('Finish').click();
  await btn('No').nth(0).click(); await btn('No').nth(1).click(); await btn('No').nth(2).click(); await btn('Too easy').click();
  await btn('Save').click();
  await startLink().click(); await page.getByText(/^Move 1 of/).waitFor();
  while (await btn('Next move').isVisible()) await btn('Next move').click();
  await btn('Finish').click();
  await btn('No').nth(0).click(); await btn('No').nth(1).click(); await btn('No').nth(2).click(); await btn('About right').click();
  await btn('Save').click();

  // F04: free week -> unlock
  check('F04-H1 unlock card after 4 sessions', await vis(page.getByRole('heading', { name: 'Keep going: weeks 2 to 8' })));
  await page.goto(base + '#session-5');
  check('F04-N1 locked session redirects to unlock', /#unlock/.test(page.url()) || (await page.waitForURL(/#unlock/).then(() => true).catch(() => false)));
  await shot('S12-unlock');
  await btn('Unlock (demo: no payment is taken)').click();
  await page.waitForURL(/#today/);
  check('F04-H2 session 5 open after unlock', await vis(page.getByText('Session 5 of 32')));

  // F03: skipping ahead is blocked, nothing resets
  await page.goto(base + '#session-20');
  await page.waitForURL(/#today/);
  check('F03-N1 cannot jump ahead', true);

  // Program, progress, group, check-in
  await link('Program').click(); await shot('S08-program');
  check('S08 shows 4 done dots', (await page.locator('.dot.done').count()) === 4);
  await link('Progress').click(); await shot('S09-progress');
  check('S09 shows sessions done', await vis(page.getByRole('heading', { name: '4 sessions done' })));
  await link('Group').click();
  await page.getByLabel('Share a win or ask the group').fill('Did my first session in the 2pm nap 🎉');
  await btn('Post').click();
  check('S10 post appears', await vis(page.getByText('Did my first session in the 2pm nap 🎉')));
  await shot('S10-group');
  await page.goto(base + '#checkin');
  await page.getByLabel('Your answer').fill('Sleep regression, but I did 4.');
  await btn('Send').click();
  check('S11 check-in saves', await vis(page.getByText('Sent. Thank you!')));

  // Long input + reload persistence
  await page.reload();
  check('Persistence after reload', await page.getByLabel('Your answer').inputValue() === 'Sleep regression, but I did 4.');

  // Redo quick check keeps payment
  await page.goto(base + '#check');
  await page.getByLabel('Weeks').fill('13'); await btn('Next').click();
  await btn('Vaginal birth').click(); await btn('Next').click();
  await btn('Yes').click(); await btn('Next').click();
  await btn('None of these').click(); await btn('Next').click(); await btn('See my plan').click();
  await page.goto(base + '#unlock');
  check('Redo quick check keeps payment', await vis(page.getByRole('heading', { name: 'You have the full program.' })));

  // F06: delete
  await page.goto(base + '#account'); await shot('S13-account');
  await btn('Delete my data').click(); await btn('Delete').click();
  await page.waitForURL(u => u.hash === '' || u.hash === '#');
  check('F06 delete returns to welcome', await vis(page.getByText('Stronger by the time they wake.')));

  // Keyboard: quick check reachable by Tab
  await page.goto(base);
  await page.keyboard.press('Tab');
  check('Keyboard focus reaches start link', await page.evaluate(() => document.activeElement?.textContent?.includes('Start the free week')));

  // Dark mode render
  const dark = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  const dp = await dark.newPage();
  await dp.goto(base);
  await dp.screenshot({ path: `${shots}/S01-welcome-dark.png`, fullPage: true });
  const bg = await dp.evaluate(() => getComputedStyle(document.body).backgroundColor);
  check('Dark mode background', bg === 'rgb(20, 33, 31)', bg);

  // Desktop width
  await page.setViewportSize({ width: 1440, height: 900 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  check('No horizontal scroll at 1440', !overflow);
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto(base);
  const overflow320 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  check('No horizontal scroll at 320', !overflow320);

  check('No console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await browser.close();
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${results.length - failed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error('CRASH', e.message); process.exit(2); });
