# Bike Mania — React Bicycle Shop

A full-stack e-commerce application for browsing and purchasing bicycles. Built as a portfolio project demonstrating real-world React patterns including custom hooks, protected routing, cookie-based authentication, lazy loading, and form validation.

---

## Live Demo

> Deployed on Firebase Hosting. Backend hosted separately.

## Visit [Bike Mania](https://bikemania-by-saakibislam.web.app/)

## Features

### Storefront

- **Homepage** — hero banner, best-seller product grid, customer reviews with star ratings, and a news section
- **Explore** — full product catalog with:
  - Debounced keyword search (name & description)
  - Min / max price filters
  - Sort by price (low → high, high → low) or name (A → Z)
  - Pagination (6 products per page) via a reusable `usePagination` hook
  - Skeleton loading cards while data fetches
- **Product Details** — product image, description, price, and a **Buy Now** button that opens the purchase modal
- **Purchase Modal** — validated checkout form (name, email, phone, street, apartment, city, ZIP, country) with Stripe payment integration and a dynamic country selector

### Authentication

- **Email / Password** registration and login (custom backend)
- **Google Sign-In** via Firebase Authentication popup
- Session maintained with **HTTP-only cookies** (set by the server) and a mirrored user object in `localStorage` for instant UI hydration
- Auth state managed globally via React Context (`AuthProvider` → `AuthContext` → `useAuth`)
- Redirects unauthenticated users to `/login` and returns them to their intended destination after login

### User Dashboard (protected)

A collapsible sidebar layout (CDB React) with role-based navigation:

| Tab            | Description                                                |
| -------------- | ---------------------------------------------------------- |
| Dashboard Home | Overview of the user's orders with cancel / status actions |
| Pay            | Stripe payment flow for pending orders                     |
| Review Product | Submit a star-rated review for a purchased product         |
| Admin Panel    | _(Admin only)_ Manage all users and orders                 |
| Add Product    | _(Admin only)_ Create, edit, and delete products           |

### User Profile (protected)

- Edit display name, phone number, and full shipping address
- Country field populated dynamically from the REST Countries API v5
- Changes saved via `PATCH /users/profile` and reflected immediately across the app without a page reload

### Contact Form

- Sends messages directly to the site owner via **EmailJS** (no backend required)
- Inline success / error feedback after submission

### Star Rating Component

- Hover-aware interactive rating (1–5 stars) for submitting reviews
- Read-only variant used on the homepage feedback section

---

## Tech Stack

| Category       | Library / Service                                         |
| -------------- | --------------------------------------------------------- |
| UI Framework   | React 17, React Bootstrap 2, Bootstrap 5                  |
| Routing        | React Router DOM v5                                       |
| Authentication | Firebase 9 (Google OAuth), custom JWT + HTTP-only cookies |
| HTTP           | Native `fetch` API with `credentials: "include"`          |
| Payments       | Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)   |
| Email          | EmailJS (`@emailjs/browser`)                              |
| Sidebar UI     | CDB React (`cdbreact`)                                    |
| Code Splitting | `React.lazy` + `Suspense`                                 |
| Hosting        | Firebase Hosting                                          |

---

## Project Structure

```
src/
├── App.js                      # Route definitions, lazy imports, Suspense wrapper
├── components/
│   ├── AuthProvider/           # React Context provider wrapping useFirebase
│   ├── PrivateRoute/           # Route guard — redirects to /login if unauthenticated
│   └── Shared/
│       ├── Navigation/         # Top navbar with auth-aware links
│       ├── Footer/             # Footer with quick links and newsletter input
│       ├── Loading/            # Full-page spinner + SkeletonCard
│       ├── CountrySelect/      # Dynamic <select> powered by REST Countries API
│       └── StarRating/         # Hover-aware star rating (interactive + read-only)
├── firebase/
│   └── firebase.init.js        # Firebase app initialization
├── hooks/
│   ├── api.js                  # useApi (GET), postApi, putApi, patchApi, deleteApi
│   ├── useFirebase.js          # All auth logic (register, login, Google, logout)
│   ├── useAuth.js              # useContext(AuthContext) shorthand
│   └── usePagination.js        # Generic pagination hook
└── pages/
    ├── Homepage/               # Banner, BestSeller, Feedback, News
    ├── Explore/                # Product grid + filters + ProductCard
    ├── ProductDetails/         # Single product view + PurchaseModal
    ├── Dashboard/              # Sidebar layout + nested routes
    │   ├── AdminPanel/         # Admin user/order management
    │   ├── Products/           # Admin product CRUD
    │   ├── DashboardHome.js    # User's order list
    │   ├── MakeReview.js       # Review submission form
    │   └── Pay.js              # Stripe checkout
    ├── Profile/                # Editable user profile
    ├── Login/                  # Email + Google sign-in
    ├── Register/               # Account creation
    ├── Contact/                # EmailJS contact form
    ├── About/
    ├── Success/
    └── NotFound/
```

---

## Routing

### Public Routes

| Path           | Page            |
| -------------- | --------------- |
| `/` or `/home` | Homepage        |
| `/explore`     | Product catalog |
| `/login`       | Login           |
| `/register`    | Register        |
| `/about`       | About           |
| `/contact`     | Contact         |
| `*`            | 404 Not Found   |

### Private Routes (require authentication)

| Path                     | Page                              |
| ------------------------ | --------------------------------- |
| `/product/:id`           | Product Details                   |
| `/dashboard`             | User Dashboard                    |
| `/dashboard/pay`         | Stripe Payment                    |
| `/dashboard/makeReview`  | Submit a Review                   |
| `/dashboard/admin-panel` | Admin Panel _(admin only)_        |
| `/dashboard/addProduct`  | Product Management _(admin only)_ |
| `/profile`               | User Profile                      |
| `/success`               | Order Success                     |

Unauthenticated requests to any private route are redirected to `/login`. The original destination is preserved in `location.state.from` and restored after a successful login.

```jsx
// PrivateRoute — redirect with preserved destination
<Redirect to={{ pathname: "/login", state: { from: location } }} />;

// After login — navigate back to the intended page
const destination = location?.state?.from || "/";
history.push(destination);
```

---

## Authentication & Sessions

### Flow

1. **Register / Login** — credentials are sent to the Express backend, which validates them, signs a JWT, and sets an **HTTP-only cookie** on the response. The browser stores and sends this cookie automatically on every subsequent request.

2. **All API requests** pass `credentials: "include"` so the cookie travels with every fetch:

   ```js
   fetch(`${apiUrl}${endpoint}`, { credentials: "include" });
   ```

3. **Client-side hydration** — the server also returns the user object (`_id`, `name`, `email`, `isAdmin`, etc.) which is written to `localStorage`. On the next page load, React state is initialised from `localStorage` immediately, before any network request completes.

4. **Google Sign-In** — Firebase handles the OAuth popup flow. The resulting Firebase user object is stored in `localStorage` for state hydration.

5. **Logout** — calls `POST /users/logout` (clears the server-side cookie), then removes `localStorage` entries and calls Firebase `signOut`.

### Auth Context Architecture

```
useFirebase()          ← all logic: register, loginUser, loginWithGoogle, logOut
      ↓
AuthProvider           ← wraps entire app, exposes value via AuthContext
      ↓
useAuth()              ← any component reads { user, setUser, logOut, isLoading, ... }
```

---

## Custom Hooks

### `useApi(endpoint)`

GET request on mount with automatic cleanup. Uses `AbortController` to cancel in-flight requests when the component unmounts. Exposes `{ data, loading, error, refetch, setData }`.

### `usePagination(items, perPage)`

Generic pagination over any array. Returns `{ page, setPage, totalPages, pageItems, start }`. Resets to page 1 automatically whenever the `items` reference changes (i.e., when search or filter state updates).

### `useFirebase()`

Centralises all Firebase and custom-backend auth operations. Manages `user`, `isLoading`, and `authError` state.

### `useAuth()`

A thin `useContext(AuthContext)` wrapper consumed by any component that needs auth state or actions.

---

## Country Selector

`CountrySelect` fetches all countries from the [REST Countries API v5](https://api.restcountries.com). Because the free tier caps each response at 100 records, three requests are fired in parallel via `Promise.all`:

```js
Promise.all([
  fetchPage(0, apiKey), // countries   1–100
  fetchPage(100, apiKey), // countries 101–200
  fetchPage(200, apiKey), // countries 201–300
]).then((pages) => {
  const names = pages
    .flat()
    .map((c) => c.names.common)
    .sort((a, b) => a.localeCompare(b));
  setCountries(names);
});
```

Renders as a native `<Form.Select>` used on both the **Profile** page and the **Purchase Modal**.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Backend API base URL
REACT_APP_API_URL=http://localhost:5000

# REST Countries API key (restcountries.com dashboard)
REACT_APP_RESTCOUNTRIES_API_KEY=your_key_here

# EmailJS (Contact form)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Stripe
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Firebase
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

> **Note:** Add `http://localhost:3000` to the allowed origins in your REST Countries API key dashboard, or country loading will be blocked by a CORS error.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/saakibislam/react-bicycle-shop.git
cd react-bicycle-shop

# Install dependencies
npm install

# Add environment variables
cp .env.example .env   # then fill in your keys

# Start the development server
npm start
```

The app runs on `http://localhost:3000`. The backend API must also be running and accessible at the URL set in `REACT_APP_API_URL`.

---

## Performance

| Technique            | Implementation                                                                |
| -------------------- | ----------------------------------------------------------------------------- |
| Code splitting       | Every page loaded with `React.lazy()` under a single `<Suspense>` boundary    |
| Skeleton screens     | `SkeletonCard` with CSS pulse animation replaces the grid while products load |
| Debounced search     | 300 ms delay via `useEffect` before the filter runs                           |
| Memoised filtering   | `useMemo` in Explore — filter + sort only recalculates when inputs change     |
| Request cancellation | `AbortController` in `useApi` cancels fetch on component unmount              |
