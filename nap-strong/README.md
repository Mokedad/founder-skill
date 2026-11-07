# Nap Strong (prototype)

A mobile-first web app prototype for Nap Strong: postpartum strength in nap-sized sessions.

- **Data** stays in the browser (localStorage). `src/store.ts` is the only file to change for a real backend (Supabase); screens don't change.
- **Payment** is a clearly labelled demo unlock. No card details are ever asked for.
- **Exercises** in `src/program.ts` are drafts. A women's health physio must write or approve every move before real mums use it.

```bash
npm install
npm run dev        # local
npm run build      # type-check + production build into dist/
node e2e/flows.cjs http://localhost:4173/ ../replica/clone-screens   # after `npx vite preview --port 4173`
```

Plan, design tokens, feature matrix and test results: `../replica/`.
