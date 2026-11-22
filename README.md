# WedPlan — Client

A wedding planning platform where customers discover vendors and request
bookings, vendors publish services and manage requests, and admins moderate the
platform. Built with **Next.js 16 (App Router)**, **ShadCN UI**, **Lucide
icons**, **Better Auth**, **MongoDB**, and **Stripe**.

The API lives in a separate repository (Express + MongoDB).

## Live Website

- **Live site:** `https://<your-client-url>` (replace after deployment)
- **API base URL:** `https://<your-server-url>`

## Tech Stack

- Next.js 16 (App Router, `proxy.js` route protection)
- React 19
- Tailwind CSS v4 with light + dark theme tokens
- ShadCN UI components + Lucide icons
- Better Auth (email/password, optional Google)
- Stripe Checkout for the vendor Premium plan
- ImgBB for optional image uploads

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Make sure the API server is running and `NEXT_PUBLIC_SERVER_URL` points to it.

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.**

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<long-random-string>

NEXT_PUBLIC_SERVER_URL=http://localhost:5000

MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
MONGODB_DB=wedplan

GOOGLE_CLIENT_ID=<optional>
GOOGLE_CLIENT_SECRET=<optional>

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PREMIUM_PRICE_ID=price_...

NEXT_PUBLIC_IMAGEBB_API_KEY=<imgbb-key>

JWT_SECRET=<must match the server>
```

## Admin Account for Evaluation

The admin account is a normal user whose `role` is set to `admin` in the
database. There is no public admin sign-up.

- **Admin email:** `xenoversegpt@gmail.com`
- **Admin password:** `<fill in the password used for this account>`

> Make sure this account exists in the production database with
> `role: "admin"` before submitting, so evaluators can sign in on the live site.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |

## Features

- Light and dark mode on every page (theme stored via `data-theme`).
- Global navbar and footer with contact and social links.
- Role-based dashboards for **customer**, **vendor**, and **admin**.
- Sign-up with inline validation, optional image upload, then redirect to
  sign-in (not auto-logged in).
- Vendors start on the Free plan (`premium: false`) and can keep up to **3
  active services**. The Add Service page shows an upgrade notice once the limit
  is reached.
- Stripe Checkout activates Premium immediately; the success page shows the
  transaction id, name, email, plan, amount, date, time, and status.
- `proxy.js` protects `/dashboard/*`, `/payment/*`, and `/services/:id` while
  leaving `/services` public.

## Deployment Guideline

1. Push this repository to GitHub (without `.env`).
2. Deploy to Vercel (or any Next.js host).
3. Add all environment variables above in the host dashboard. Point
   `NEXT_PUBLIC_SERVER_URL` at the deployed API and `BETTER_AUTH_URL` at the
   deployed client URL.
4. In the API's Stripe settings, set the success URL to
   `https://<your-client-url>/payment/success` and the cancel URL to
   `https://<your-client-url>/payment/cancel`.
5. Verify sign-up, sign-in, vendor service creation, and the Stripe upgrade flow
   on the live site.
