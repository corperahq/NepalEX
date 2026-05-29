# NepalEX — Website (Next.js Rebuild)

A modern, animated marketing website for **NepalEX (Nepal Express Parcel and Logistics)** — Nepal's #1 courier & cargo network. Built per [plan.md](plan.md).

## Tech stack

- **Next.js 15** (App Router, React 19, Server Components, SSR/SSG)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Framer Motion** (scroll reveals, hero motion, micro-interactions)
- **lucide-react** (icons)
- Fonts via `next/font`: **Montserrat** (display) + **Poppins** (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

> **Note on stale build folders:** if you ever see an `EACCES: permission denied` on `.next/`, it's a leftover build directory from a restricted environment. Remove stale artifacts and rebuild:
> ```bash
> sudo rm -rf .next dist build vbuild _verify.txt   # one-time cleanup of locked leftovers
> npm run build
> ```

## Pages

### Public marketing site
| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, services, how-it-works, rate calculator, why-choose-us, CTA |
| `/services` | All services + how-it-works |
| `/rate-calculator` | Instant shipping rate estimator |
| `/track` | Shipment tracking with animated status timeline |
| `/about` | Company story, values, stats |
| `/contact` | Contact details, message form, FAQ |

### Client dashboard (`nepalex.com/client/*`)
A full, animated client portal with dummy data, skeleton loaders, filters, search, pagination and charts.

| Route | Description |
|-------|-------------|
| `/client/login` | Client login (demo) — split hero/form layout, show/hide password, demo autofill |
| `/client` | Overview — KPI stats, volume & status charts, quick actions, recent shipments, activity |
| `/client/analytics` | Volume, spend, weekly activity, top destinations, status mix |
| `/client/shipments` | Searchable, filterable, paginated shipments table |
| `/client/shipments/[id]` | Shipment detail with animated tracking timeline |
| `/client/create` | Multi-step new-shipment wizard (sender → receiver → package → service) |
| `/client/pickups` | Schedule + manage pickups |
| `/client/tracking` | Track by AWB with live timeline |
| `/client/rates` | Rate calculator + rate card |
| `/client/billing` | Invoices with status filters |
| `/client/payments` | Payment history + saved methods |
| `/client/addresses` | Address book (sender/receiver cards) |
| `/client/notifications` | Notification center with tabs + read/unread |
| `/client/support` | Raise tickets + ticket list + contact |
| `/client/settings` | Profile, business, security (2FA), notification prefs |

The dashboard uses its own chrome (sidebar + topbar) via `app/client/layout.tsx`; the marketing navbar/footer are suppressed on `/client/*` by `SiteChrome`. All dummy data lives in [lib/dashboard-data.ts](lib/dashboard-data.ts); reusable dashboard UI (skeletons, charts, tables, filters, badges) is in [components/dashboard/](components/dashboard/).

### Demo login

The dashboard is gated by a demo, front-end-only auth ([lib/auth.ts](lib/auth.ts), localStorage-based). Visiting any `/client/*` route while signed out redirects to `/client/login`.

| Field | Value |
|-------|-------|
| **Username** | `client` |
| **Password** | `Abcd@123` |

Replace `lib/auth.ts` with the real NepalEX backend / NextAuth when the API is available.

## Project structure

```
app/                 # routes (App Router) + layout + globals.css
components/
  layout/            # Navbar, Footer
  sections/          # Hero, Stats, ServicesGrid, WhyChooseUs, HowItWorks, CtaBand
  forms/             # RateCalculator, TrackForm, ContactForm
  ui/                # Reveal, Counter, SectionHeading, PageHeader
lib/site.ts          # all site content (single source of truth)
```

## What's mocked (wire to backend later)

The **rate calculator**, **shipment tracking**, and **contact form** currently use realistic client-side demo logic. Connect them to the NepalEX backend API for live rates, real tracking, and email delivery (see plan.md §10). Suggested next steps: add the customer portal (login, shipping requests) and the admin/back-office ERP once the API is confirmed.

## Editing content

All copy, services, stats, FAQs and contact info live in [lib/site.ts](lib/site.ts) — edit there to update the whole site.
