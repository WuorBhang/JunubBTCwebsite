# JunubBTC 🇸🇸⚡️

**A non-custodial Lightning-to-Fiat bridge for South Sudan.**

JunubBTC is an open-source mobile application designed to seamlessly bridge the
Bitcoin Lightning Network with the local South Sudanese economy. It allows
users to send money to local mobile money accounts, pay bills, and buy goods
using their existing Lightning wallets — without JunubBTC ever taking custody
of their funds.

_Built for presentation at **bitcoin++ Nairobi (Open Source Edition)** | June
17–19, 2026._

---

## 🌍 The Problem

South Sudan faces extreme currency volatility. The SSP has slid from **150 SSP
per USD 100 in 2011** to over **587,000 SSP per USD 100 today**. While Bitcoin
provides a strong store of value and a global medium of exchange, local utility
remains low — residents need a way to pay for everyday goods, airtime, and
utility bills in South Sudanese Pounds while leveraging the speed and low cost
of the Lightning Network.

## 💡 The Solution: Non-Custodial Handoff

JunubBTC acts as a **smart routing bridge**, not a wallet.

Instead of forcing users to deposit funds into a new custodial app, JunubBTC
detects the user's preferred Lightning wallet (Phoenix, Wallet of Satoshi,
Muun, Strike, etc.) already installed on their device and triggers the payment
through a deep link.

### How it works

1. **The Intent** — User inputs a destination (merchant QR, MTN MoMo number, or
   bill) and the amount in SSP.
2. **The Calculation** — Backend converts SSP into sats using real-time market
   rates.
3. **The Invoice** — JunubBTC generates a BOLT11 Lightning invoice for the
   exact sat amount.
4. **The Handoff** — A `lightning:` URI wakes up the user's native Lightning
   wallet to prompt the payment.
5. **The Settlement** — On payment, a backend webhook triggers the local fiat
   payout to MTN MoMo or mGURUSH in seconds.

---

## 🛠 Tech Stack

**Mobile App** — React Native (Expo), React Navigation, `react-native-vision-camera`, `Linking` API.

**Website (this folder)** — React 18, TypeScript, Vite, Tailwind CSS, lucide-react.

**Backend** — Node.js / Express, LNBits or Alby API, SQLite / PostgreSQL.

---

## 🚀 Running the website

```bash
cd "JunubBTCwebsite"
npm install
npm run dev
```

Open <http://localhost:5173> in your browser.

### Build

```bash
npm run build
npm run preview
```

### Fonts

The site uses **TT Norms Pro** (a commercial font). Drop these two files into
`public/fonts/`:

- `tt-norms-pro-regular.woff2`
- `tt-norms-pro-semibold.woff2`

Until you do, the page falls back to Inter / system sans-serif.

---

## 🛣 Roadmap

- **v0.1 (MVP)** — End-to-end invoice generation, wallet handoff, simulated
  fiat payout. _Presented at bitcoin++ Nairobi._
- **v0.2** — Live MTN MoMo and mGURUSH settlement APIs.
- **v0.3** — Merchant dashboard and static LNURL-pay QR codes for storefronts.

## 📄 License

MIT — see [LICENSE](../LICENSE).
