# acme-storefront

Acme Outdoor's web storefront. Express serves `public/` (vanilla JS, no build step) plus a tiny JSON API.

```sh
npm install
npm start        # http://localhost:3000
npm test
```

- `public/cart.js` — cart math (shared with unit tests)
- `public/app.js` — UI wiring
- `server/app.js` — products, promo lookup, order placement

---

This repo is a starter for a Devin demo. See [DEVIN_DEMO.md](DEVIN_DEMO.md) for setup and the prompt.
