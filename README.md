# 💍 WedPlan

A role-based wedding planning platform built with **Next.js**, **React**, and **Tailwind CSS**. Customers discover wedding services and send booking requests, vendors publish services and manage requests, and admins moderate the platform. Vendors can upgrade to a Premium plan through **Stripe Checkout**, backed by a dedicated Express and MongoDB API.

- 🔗 **Live App:** [wedplan-ten.vercel.app](https://wedplan-ten.vercel.app)
- 📦 **Client Repository:** [theopsupcorp1009/wed-planner](https://github.com/theopsupcorp1009/wed-planner)
- 🖥️ **Live Server API:** [wedplan-server-hazel.vercel.app](https://wedplan-server-hazel.vercel.app/)
- 📦 **Server Repository:** [theopsupcorp1009/weplanner-server](https://github.com/theopsupcorp1009/weplanner-server)

---

## ✨ Features

### Public
- **Home page** with a wedding-themed hero banner, featured services, browse-by-category cards, a "Why Choose WedPlan" section, and a "How It Works" guide, with smooth Motion animations
- **Browse Services** page showing only approved and active services, with:
  - Search by service name
  - Category filter and location filter
  - Sort by price (ascending or descending)
  - Loading and empty states
- **Service details** page (sign-in required) with images, description, price, location, vendor info, a Premium vendor badge, and a booking form

### Customer
- Submit booking requests with event date, event location, and a message
- **Dashboard overview** with total, pending, accepted, and rejected booking counts
- **My Bookings** with status tracking and cancellation of pending requests
- Duplicate request protection and a block on past event dates

### Vendor
- **Dashboard overview** with total services, active services, pending requests, accepted bookings, and current plan
- **Add Service** with image upload to ImgBB, saved as *pending* until an admin approves it
- **My Services** to edit, delete, view approval status, and toggle availability
- **Booking Requests** to accept or reject pending requests
- **Subscription** page with Free and Premium plans and an **Upgrade to Premium** button
- Free plan limit of 3 active services, unlimited on Premium

### Admin
- **Dashboard overview** with users, vendors, customers, services, pending services, and transactions
- **Manage Users** with search, role filter, and block or unblock
- **Manage Services** to approve, reject, change status, or delete services
- **Transactions** list of verified subscription payments (read only)

### Platform
- **Authentication** with [better-auth](https://www.better-auth.com/) and the MongoDB adapter: email and password plus Google sign-in
- Password rules: at least 6 characters, with an uppercase and a lowercase letter
- Account role choice (Customer or Vendor) at sign-up, with no public admin registration
- **Role-based route protection** in middleware and on every dashboard layout, so users cannot open another role's dashboard by editing the URL
- **Blocked user** handling with a dedicated blocked page
- **JWT** issued by the app and verified by the API on every protected request
- **Stripe Checkout** with a payment success page and a payment cancel page
- Profile settings for name and photo
- Light and dark theme toggle
- Toast notifications for all success and error messages, no browser alerts
- Dashboard layout with sidebar, loading skeletons, a custom 404 page, and a responsive design for mobile, tablet, and desktop

---

## 🖥️ Tech Stack

| Layer            | Technology                                             |
|------------------|---------------------------------------------------------|
| Framework        | [Next.js](https://nextjs.org/) 16 (App Router)          |
| UI Library       | React 19 with React Compiler                            |
| Styling          | Tailwind CSS v4, shadcn/ui (Radix UI), Lucide icons     |
| Animation        | Motion (Framer Motion)                                  |
| Authentication   | better-auth, `@better-auth/mongo-adapter`, Google OAuth |
| Authorization    | JWT (`jsonwebtoken`)                                    |
| Payments         | Stripe Checkout (test mode)                             |
| Image Hosting    | ImgBB                                                   |
| Notifications    | react-toastify                                          |
| Database         | MongoDB                                                 |
| Backend API      | [WedPlan Server](https://github.com/theopsupcorp1009/weplanner-server) (Express + MongoDB) |
| Deployment       | Vercel                                                  |

---

## 📂 Project Structure

```
wedplan/
├── public/
│   └── assets/                          # Logo, hero, category and placeholder images
├── src/
│   ├── app/
│   │   ├── page.js                      # Home page
│   │   ├── layout.js / not-found.jsx
│   │   ├── services/
│   │   │   ├── page.jsx                 # Browse services (public)
│   │   │   └── [id]/page.jsx            # Service details (private)
│   │   ├── sign-in/ sign-up/ forgot-password/
│   │   ├── blocked/page.jsx             # Shown to blocked users
│   │   ├── payment/
│   │   │   ├── success/page.jsx
│   │   │   └── cancel/page.jsx
│   │   ├── dashboard/
│   │   │   ├── page.jsx                 # Redirects to the role's dashboard
│   │   │   ├── customer/                # overview, bookings, settings
│   │   │   ├── vendor/                  # overview, services, add-service,
│   │   │   │                            # bookings, subscription, settings
│   │   │   └── admin/                   # overview, users, services,
│   │   │                                # transactions, settings
│   │   └── api/
│   │       ├── auth/[...all]/route.js   # better-auth route handler
│   │       └── token/route.js           # Issues a short-lived JWT for the API
│   ├── components/
│   │   ├── homepage/                    # Banner, FeaturedServices, BrowseByCategories,
│   │   │                                # WhyChoose, HowItWorks, Reveal
│   │   ├── dashboard/                   # Shell, parts, service form, profile form
│   │   ├── auth/                        # Sign in, sign up, forgot password forms
│   │   ├── others/                      # Browse client, service details
│   │   ├── payment/PaymentSuccess.jsx
│   │   ├── users/CustomerBooking.jsx
│   │   ├── shared/                      # Navbar, Footer, ThemeToggle
│   │   └── ui/                          # shadcn/ui components
│   ├── lib/
│   │   ├── auth.js / auth-client.js     # better-auth server and client
│   │   ├── api.js                       # Authenticated fetch helper
│   │   ├── guard.js                     # Server-side role guard
│   │   └── uploadImage.js               # ImgBB upload helper
│   └── proxy.js                         # Route protection middleware
├── .env                                 # Environment variables (never commit)
├── package.json
└── next.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- npm (or yarn / pnpm / bun)
- A MongoDB database
- Google OAuth credentials
- A Stripe account in test mode with a recurring Premium price
- An ImgBB API key
- A running instance of the [WedPlan Server](https://github.com/theopsupcorp1009/weplanner-server), local or hosted

### Installation

```bash
# Clone the repository
git clone https://github.com/theopsupcorp1009/wed-planner.git
cd wed-planner

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# App and better-auth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_long_random_secret

# Backend API
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# MongoDB (same database the server uses)
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=wedplan

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PREMIUM_PRICE_ID=price_...

# ImgBB
NEXT_PUBLIC_IMAGEBB_API_KEY=your_imgbb_api_key

# Must match the server exactly
JWT_SECRET=your_shared_jwt_secret
```

> `JWT_SECRET` must be identical on the client and the server, and `MONGODB_URI` and `MONGODB_DB` must point to the same database. Never commit `.env` or share real secrets publicly.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 🔐 Admin Access

Admin accounts cannot be created through public registration. Sign-up only allows the **Customer** and **Vendor** roles, and the role field cannot be changed from profile updates.

To create an admin, register a normal account and then set its `role` to `admin` directly in the `user` collection of the database.

For evaluation, use the admin credentials provided with the submission:

| Field    | Value                       |
|----------|-----------------------------|
| Email    | _add the admin email here_  |
| Password | _share this privately_      |

---

## 🎛️ How to Use

1. Open the **Home** page and click **Explore Wedding Services**.
2. **Sign up** as a **Customer** to book services, or as a **Vendor** to publish them.
3. As a vendor, go to **Add Service**. New services stay *pending* until an admin approves them.
4. As an admin, open **Manage Services** and approve the service so it appears on Browse Services.
5. As a customer, open a service, then submit a booking request with your event date and location.
6. The vendor opens **Booking Requests** and accepts or rejects it. The customer sees the result in **My Bookings**.
7. To publish more than 3 active services, a vendor opens **Subscription** and upgrades to Premium.

### Testing Stripe payments

Use Stripe's test card on the Checkout page:

| Field       | Value                  |
|-------------|------------------------|
| Card number | `4242 4242 4242 4242`  |
| Expiry      | Any future date        |
| CVC         | Any 3 digits           |

Premium is activated only after the server verifies the payment with Stripe, either through the verified webhook or by confirming the Checkout session on the server. The browser redirect alone never grants Premium.

---

## 🔗 Backend Integration

The client sends a short-lived JWT from `/api/token` in the `Authorization: Bearer <token>` header. The server verifies the token and the user's role on every protected request.

| Area      | Requests                                                                  |
|-----------|---------------------------------------------------------------------------|
| Public    | `GET /services`, `GET /services/:id`, `GET /categories`                   |
| Customer  | `GET/POST /customer/bookings`, `PATCH /customer/bookings/:id/cancel`      |
| Vendor    | `GET/POST /vendor/services`, `PATCH/DELETE /vendor/services/:id`, `PATCH /vendor/services/:id/availability`, `GET /vendor/bookings`, `PATCH /vendor/bookings/:id`, `GET /vendor/transactions` |
| Payments  | `POST /payments/create-checkout-session`, `POST /payments/confirm`        |
| Admin     | `GET /admin/users`, `PATCH /admin/users/:id`, `GET/PATCH/DELETE /admin/services`, `GET /admin/transactions` |

Full API documentation lives in the [server README](https://github.com/theopsupcorp1009/weplanner-server#readme).

---

## 🌐 Deployment

This app is deployed on **Vercel**. Any push to the connected branch triggers an automatic build and deployment.

To deploy your own copy:

1. Push this repository to your GitHub account without the `.env` file.
2. Import the project into [Vercel](https://vercel.com/new).
3. Add all the environment variables listed above in the Vercel project settings.
4. Set `BETTER_AUTH_URL` to your production domain, add it to `trustedOrigins` in `src/lib/auth.js`, and add the matching Google OAuth redirect URL.
5. Point `NEXT_PUBLIC_SERVER_URL` to your deployed server.
6. Make sure the server's `CLIENT_URL` is set to this app's production URL so Stripe redirects back correctly.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- Authentication powered by [better-auth](https://www.better-auth.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Payments by [Stripe](https://stripe.com/) and image hosting by [ImgBB](https://imgbb.com/)
- Hosted on [Vercel](https://vercel.com/)

---

## 📝 Project Summary

**WedPlan** is a full-stack wedding planning platform split into two projects: a Next.js frontend and an Express and MongoDB backend. Customers browse approved services and request bookings, vendors publish services and manage requests under a Free or Premium plan, and admins review services, manage users, and monitor transactions. The frontend uses the App Router with React 19 and the React Compiler, authenticates users with better-auth (email and password plus Google), and sends JWTs to the API, which re-checks roles, ownership, and blocked status on every protected route. Premium access is granted only after Stripe payments are verified on the server. Styled with Tailwind CSS and shadcn/ui, with dark mode, Motion animations, toast feedback, and a responsive dashboard layout, the project demonstrates practical experience with role-based access control, payment integration, CRUD workflows, image uploads, and deploying separate frontend and backend services on Vercel.
