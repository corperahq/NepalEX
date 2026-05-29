# NEPALEX — Website Rebuild Plan

> Full analysis of the current [nepalex.com](https://www.nepalex.com/) and a solid plan to rebuild it as a modern, professional, animation-rich product on **Next.js**.
>
> _Captured 2026-05-29 directly from the live site. The current site is a client-rendered React SPA (blank HTML for crawlers), so the HTML shell, the full JS bundle, and the CSS bundle were downloaded and inspected to recover the real content, features, and design. Everything below marked "verified" was pulled straight from those bundles._

---

## 1. What NEPALEX Actually Is

**NEPALEX** is the brand/short name for **Nepal Express Parcel and Logistics (Pvt. Ltd.)** — a **courier, cargo, and logistics company** based in Nepal. (The "EX" = **Express**.) It handles domestic and international parcel delivery, air & sea cargo, e‑commerce logistics, customs clearance, and pickups, backed by a full shipment-management back office.

**Verified positioning copy (verbatim from the site):**
- _"Currently Nepal's Number 1 Courier Service Provider with largest volume of shipments."_
- _"Years of Expertise in Serving the Dynamic need of On Demand Cargo and Courier Service."_
- _"Through our efficient network, Nepal Express Parcel and Logistics provides consistent and high-quality domestic and international delivery services."_
- _"More than 9 years of experience in the service. One of the oldest service providers in Nepal."_
- _"Providing Fast and Reliable service since 2012."_

**Key facts:**
- **Industry:** Courier / Cargo / Logistics (the page meta description "Courier and Logistics company" is correct).
- **Operating since:** 2012 (9+ years experience).
- **Built / maintained by:** **NstStock Pvt. Ltd.** ("Made with love by NstStock Pvt. Ltd.").
- **Contact (verified in bundle):**
  - Email: **cs@nepalex.com**, **expressmela@gmail.com**
  - Phone: **+977‑9851148010**
  - Hours: **Sunday–Friday / 10:00 AM to 7:00 PM**

> ⚠️ Earlier "crypto/USDT" signals were a **misread** — "exchange rate" on this site refers to **currency conversion for international freight pricing**, not crypto. The product is logistics.

---

## 2. Current Tech & Design (verified)

| Aspect | Finding |
|--------|---------|
| **Framework** | React SPA via **Create React App** (`/static/js/main.*.js`, single `<div id="root">`). 100% client-rendered → **blank HTML for crawlers / poor SEO**. |
| **UI library** | **Material‑UI (MUI)** + **material-table** (admin data grids). |
| **PDF/report** | **jsPDF + autotable** (invoices, billing, reports → PDF; also CSV export). |
| **Data / forms** | **TanStack Query** (server state), **Formik + Yup** (forms/validation), **axios**, **react-toastify** (toasts), MUI date pickers. |
| **Fonts** | **Poppins** (body) + **Montserrat 600** (titles); MUI Roboto fallback. |
| **Theme color** | `#000000`; landing sections use dark gradient overlays on photos (`/assests/images/landing_page/1.jpg`, `2.jpg`, `parcels.jpg`, `about1.jpg`). |
| **Rendering** | Client-only; `"You need to enable JavaScript to run this app."` fallback. |

**Implication:** Moving to Next.js (SSR/SSG) is the single biggest win — it fixes SEO/blank-HTML and speeds first load, while we modernize the visuals and motion.

---

## 3. Verified Site Map & Features

### 3.1 Public marketing site
- **Hero** with rotating background images of parcels/cargo + dark overlay.
- **Get To Know Us / About Us** — company story, 2012, "Number 1 courier", network.
- **Our Services** (4 cards):
  1. **Parcels** — _"Transportation by postal systems, express mail companies, private couriers and LTL carriers."_
  2. **Air Cargo** — _"Shipment of goods via air transportation, often on dedicated cargo aircraft."_
  3. **Sea Cargo** — _"Shipment of goods via sea transportation, often on cargo ships or freight ships."_
  4. **Ecommerce Logistics** — _"Fast, worldwide courier service from pickup to delivery for easy global shipping."_
  - Plus: **Import / Export**, **Door to Door**, **Airport to Airport**, **Custom Clearance**.
- **Why Choose Us** (4 highlights):
  1. **#1 Service Provider** — largest volume of shipments.
  2. **9+ Years of Experience** — one of the oldest in Nepal.
  3. **Fast and Reliable** — since 2012, "we take care of every consignment seriously."
  4. **Provides Best Deals** — best deal among the competition.
- **Rate Calculator (public)** — _"Check Our Rates"_: inputs for **Service Provider**, **Destination Country**, **Estimated Weight (in Kg)** → **Check Rate** → **Estimated Rate**.
- **Contact Us** — _"We are here!"_, address/phone/email, hours, and a **message form** (Your Message → Send Message).
- **Footer** — Privacy Policy, "Made with love by NstStock Pvt. Ltd.".

### 3.2 Customer accounts (verified)
- **Login / Sign Up / Forgot password.**
- **Account types:** **Personal Account** and **Business Account**.
- **Register fields:** First Name, Last Name, **Business Name**, Email Address, **PAN No.**
- **Customer portal:**
  - **Shipping Request** — multi-step wizard: **Package Details → Address Details → Payment Details → Place Request** (fields: shipment service/type, content type, package type, parcel description, parcel value, dimensions/weight, pickup address, destination country/postal code, remote area, payment method = Bank Transfer, etc.). Confirmation: _"Thank you for your shipping request… we have emailed your shipment confirmation."_
  - **My Shipping Requests / My Shipments** (with **Tracking Number**), **Cancel Shipment Request**.
  - **My Pickups**, profile image upload, change password.

### 3.3 Admin / back-office (it's a full logistics ERP — verified)
A large authenticated operations system, including:
- **Shipments & Shipment Requests** (confirm, verify weight, bill, status updates).
- **AWB / Master AWB management** (Air Waybills, airlines, duplicate detection, bulk upload).
- **Pickups** (create/assign/update).
- **Service Providers** (API key/secret, zones, rates, buying price, surcharges, export rates).
- **Customers** (personal/business, bulk CSV upload + template, issue passwords, notices, suspend/restore).
- **Admins** (system admin, enable/disable).
- **Payments & Billing** — invoices, payment history, totals: **Freight, VAT, TIA, Customs, Strip, Doc, Others, Grand Total**; **Export to PDF / CSV**.
- **Rates management** — per service provider/country/zone, exchange rate, custom charges, min charges, emergency surcharge.
- **Country / Zone management**, **Office & Customer Notices**, **Reports**.

---

## 4. Goals for the Rebuild

1. **Modern, professional, more attractive** than the current MUI/CRA site.
2. **More creativity + tasteful, high-impact animation** (logistics/movement themed).
3. **Modern stack — Next.js** (App Router) + complementary tooling.
4. **Fix SEO & performance** (SSR/SSG vs. today's blank client-only HTML).
5. Preserve all real content/features; replace dated UI with a clean, trustworthy brand.
6. Fully **responsive**, fast, accessible.

---

## 5. Recommended Tech Stack

### Core
- **Next.js 15** (App Router, React 19, Server Components) — SSR/SSG for SEO + speed.
- **TypeScript**.

### Styling & UI
- **Tailwind CSS v4** + design tokens (keep Poppins/Montserrat; black + a strong brand accent, e.g. red/orange "express" energy or deep blue "logistics trust" — confirm with client).
- **shadcn/ui** — replaces MUI with lighter, modern, accessible components (forms, tables, dialogs, toasts).
- **TanStack Table** — replaces material-table for admin grids (faster, headless, themeable).
- **next/font** — self-host Poppins + Montserrat (no layout shift).

### Animation ("wow" layer)
- **Framer Motion (motion)** — scroll reveals, staggered cards, hover micro-interactions, page transitions.
- **GSAP + ScrollTrigger** — pinned "how shipping works" sequence, parallax hero, animated route/plane/truck path.
- **Lenis** — smooth scrolling.
- **Lottie** — animated icons for Parcels / Air / Sea / Ecommerce; tracking animations.
- **CountUp / number-flow** — animated stats (shipments delivered, years, countries served).
- Optional **react-three-fiber** or **tsParticles** — subtle moving globe / route-network hero.

### Data & forms
- **TanStack Query** — keep for server state (rates, shipments, orders).
- **React Hook Form + Zod** — replaces Formik/Yup (lighter, type-safe) for auth, shipping wizard, rate calculator, contact.
- **axios / fetch** — integrate the **existing NepalEX backend API** (do not rebuild it — confirm endpoints).
- **PDF**: keep jsPDF (or move to server-side PDF via `@react-pdf/renderer`) for invoices/reports.

### Quality / Ops
- **ESLint + Prettier**, **next/image** for optimized parcel/cargo imagery.
- **Vercel** hosting + Analytics + Speed Insights.
- Security: input validation, auth guards on portal/admin routes, secure cookies, CSP headers.

---

## 6. Design Direction

- **Theme:** Clean, trustworthy logistics brand with bold motion.
  - Dark, premium hero sections (dark overlay on real cargo/parcel photography — already the current style) → keep & sharpen.
  - A confident **brand accent** for "express/speed" (recommend red/orange) on white/light content sections for readability; black for headers/footers. _(Confirm exact palette + logo with client.)_
- **Type:** Montserrat (display/headings) + Poppins (body/UI).
- **Motion motifs:** moving routes (plane/ship/truck along a dotted path), parcel-to-doorstep reveal, animated tracking timeline, count-up stats, map/globe of served countries.
- **Trust signals (crucial for logistics):** "since 2012", "Nepal's #1", shipment volume stats, countries served, customer logos/testimonials, live tracking, transparent rate calculator, clear contact + hours.
- **Accessibility:** WCAG AA contrast; honor `prefers-reduced-motion`.

---

## 7. Proposed Route Structure

### Public (SSG/SSR — SEO)
| Route | Purpose | Key animation |
|-------|---------|---------------|
| `/` Home | Hero + services + why-us + rate calculator + tracking CTA + stats | route-path hero, staggered service cards, count-up stats |
| `/services` (+ `/services/[slug]`) | Parcels, Air Cargo, Sea Cargo, Ecommerce, Import/Export, Customs | per-service Lottie, scroll reveals |
| `/rate-calculator` | Service provider + destination + weight → estimated rate | animated result, sparkline |
| `/track` | Track by Tracking Number → animated status timeline | pinned timeline reveal |
| `/about` | Company story, 2012, network, team | parallax, count-up |
| `/contact` | Form + map + phone/email/hours | validated form, success toast |
| `/faq`, `/privacy`, `/terms` | Support & legal | accordion / static |

### Customer portal (auth)
`/login` `/register` (Personal/Business) · `/dashboard` · `/ship` (multi-step request) · `/shipments` (+ tracking) · `/pickups` · `/profile`

### Admin / back-office (role-guarded)
`/admin/dashboard` · `/admin/shipments` · `/admin/requests` · `/admin/awb` · `/admin/pickups` · `/admin/customers` · `/admin/service-providers` · `/admin/rates` · `/admin/payments` · `/admin/billing` · `/admin/notices` · `/admin/reports` · `/admin/admins` · `/admin/countries-zones`

> **Sequence:** ship the **public marketing site** first (biggest visual/SEO win), then the **customer portal**, then the **admin ERP** (wire to existing API).

---

## 8. Proposed Project Structure

```
nepalex/
├── app/
│   ├── (marketing)/        # public SSG/SSR: home, services, rate-calculator, track, about, contact, faq
│   ├── (portal)/           # customer: dashboard, ship, shipments, pickups, profile
│   ├── (admin)/            # back-office ERP (role-guarded)
│   ├── api/                # route handlers / proxy to backend
│   ├── layout.tsx  globals.css
├── components/
│   ├── sections/   # Hero, Services, WhyChooseUs, RateCalculator, TrackWidget, Stats, CTA
│   ├── portal/     # ShipWizard, ShipmentsTable, TrackingTimeline
│   ├── admin/      # data tables, billing, AWB, rates forms
│   ├── ui/         # shadcn primitives
│   └── animations/ # Reveal, RoutePath, Counter, Magnetic
├── lib/            # api client, auth, zod schemas, format (NPR, weight, currency)
├── content/        # site copy (single source of truth)
├── public/         # cargo/parcel imagery, lottie json
└── tailwind.config.ts  next.config.ts
```

---

## 9. Build Phases

1. **Scaffold** — `create-next-app` (TS, Tailwind, App Router); install animation + form deps; Poppins/Montserrat via `next/font`.
2. **Design system** — tokens (black + brand accent), typography, buttons/cards/inputs, motion primitives, shadcn setup.
3. **Layout shell** — animated Navbar (Track + Login/Get a Quote CTAs) + Footer + Lenis smooth scroll.
4. **Home** — high-impact hero (route animation + headline), services, why-us, rate calculator, stats, tracking CTA.
5. **Marketing pages** — Services (+ detail), Rate Calculator, Track, About, Contact, FAQ (real copy + animations).
6. **Auth & portal** — Login/Register (Personal/Business), Dashboard, multi-step Ship request, Shipments + tracking, Pickups, Profile (wired to backend).
7. **Admin ERP** — migrate shipments, AWB, pickups, customers, service providers, rates, payments/billing, reports (TanStack Table; PDF/CSV export).
8. **Polish** — micro-interactions, reduced-motion, responsive QA, Lighthouse 90+.
9. **SEO & ops** — metadata, OG images, sitemap, robots, JSON-LD (LocalBusiness/Organization), fix old meta; auth guards, CSP.
10. **Deploy** — Vercel + custom domain + analytics.

---

## 10. Must-Confirm With Client Before Build

- ☐ **Existing backend API** — endpoints & auth for rates, shipments, AWB, customers, payments, tracking. (Reuse it; the frontend integrates, doesn't rebuild.)
- ☐ **Brand assets** — high-res logo/SVG, **exact brand colors**, favicon. (Current theme is black; accent TBD.)
- ☐ **Real marketing copy & imagery** (some current text is generic) — hero, about, service descriptions, testimonials.
- ☐ **Service provider list** & destinations/zones for the rate calculator.
- ☐ **Tracking integration** — internal AWB tracking and/or partner carriers.
- ☐ **Confirm contact details** still current: cs@nepalex.com / expressmela@gmail.com / +977‑9851148010 / Sun–Fri 10–7, plus **physical address** & socials.
- ☐ **Stats for counters** — shipments delivered, countries served, customers, years.
- ☐ **Scope** — rebuild public site only, or also customer portal + admin ERP?
- ☐ **Legal** — Privacy Policy & Terms content.

---

## 11. Quick Wins vs. Current Site

- **SEO:** SSR/SSG + correct metadata vs. today's blank client-only HTML.
- **Performance:** code-splitting, `next/image`, optimized fonts vs. one large CRA+MUI bundle.
- **Modern UI:** shadcn + Tailwind vs. dated default MUI; faster TanStack Table admin grids.
- **Polish & trust:** route/tracking animations, count-up stats, social proof, prominent rate calculator + tracking → higher conversion.
- **Maintainability:** TypeScript + Zod + clear App Router structure.

---

_End of plan. This file is informational only. Next step: confirm Section 10 with the client, then scaffold the Next.js project per Section 9._
