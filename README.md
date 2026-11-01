# Dok Scrap Krumpa's Emporium

[![CI](https://github.com/Baleandor/React-Web-Store/actions/workflows/ci.yml/badge.svg)](https://github.com/Baleandor/React-Web-Store/actions/workflows/ci.yml)

An Ork-themed online marketplace built with React 19 and TypeScript. Browse and search products, manage a cart and wishlist, and list your own items for sale.

<!--
  TODO: add the live demo link and a screenshot/GIF here, e.g.
  **[Live demo](https://your-deploy-url)** · demo account: demo@example.com / password
  ![Home page](docs/screenshot-home.png)
-->

## Features

- **Authentication**: register, log in and log out with Supabase Auth. Protected pages redirect to login and send you back to where you were afterwards.
- **Browsing**: products and categories from the [Fake Store API](https://fakestoreapi.com), with cached requests and loading, error and empty states.
- **Search**: debounced as-you-type suggestions with full keyboard support (arrow keys, Enter, Escape), plus a results page that matches title and category.
- **Cart**: add, increase, decrease, remove and clear items. Saved to `localStorage` with versioned migrations, so a schema change never breaks a returning visitor's cart.
- **Wishlist**: save products and Da Dok's own stock to your account.
- **Selling**: create, edit and delete your own listings, with schema-validated forms.
- **Responsive and accessible**: mobile-first layout, labelled form fields with linked error messages, an ARIA combobox search, visible focus styles and announced notifications.

## Tech stack

| Concern      | Choice                                                 |
| ------------ | ------------------------------------------------------ |
| UI           | React 19, TypeScript (strict), Tailwind CSS 4          |
| Build        | Vite                                                   |
| Routing      | React Router data router, lazily loaded pages          |
| Server state | TanStack Query (Fake Store API and Supabase user data) |
| Client state | Redux Toolkit + Redux Persist (cart, session, toasts)  |
| Forms        | React Hook Form + Zod                                  |
| Backend      | Supabase (auth and user data)                          |
| Quality      | Vitest, Testing Library, ESLint, Prettier, GitHub CI   |

## Architecture

```
react-web-store/src
├── pages/            One component per route, each code-split into its own chunk
├── components/
│   ├── form/         FormField (label + error + aria wiring), ListingForm, AuthCard
│   ├── layout/       Layout, RequireAuth (protected routes), RouteError
│   ├── navbar/       SearchBar, CategoriesMenu, UserMenu, CartLink
│   └── ui/           ProductCard, ProductImage, Spinner, Toasts, ...
├── hooks/            Data hooks (useProducts, useUserList) and UI hooks
├── store/            Redux slices, memoised selectors, persist migrations
├── utils/            API client, route helpers, search matching, formatting
├── schemas.ts        Zod schemas shared by validation and form types
└── router.tsx        Route tree
```

Design decisions:

- **Server state and client state are kept apart.** Remote data (products, the user's listings) lives in TanStack Query, which handles caching, refetching and mutations. Redux holds only state the browser owns: the cart, the mirrored auth session and toast notifications.
- **One source of truth for the session.** `useAuthSync` subscribes to Supabase auth events once at the root and mirrors the user into Redux, so components never call Supabase to ask "am I logged in?".
- **Validation is defined once.** Each form's Zod schema is both the runtime validator and the source of the form's TypeScript type.
- **Routes are declared, not hard-coded.** Paths come from `ROUTES` and `paths.*` helpers, so a URL change is a one-line edit.

## Getting started

Requires Node.js 22.22 or newer and a free [Supabase](https://supabase.com) project with email auth enabled.

```bash
git clone https://github.com/Baleandor/React-Web-Store.git
cd React-Web-Store/react-web-store
npm install
cp .env.example .env.local   # then fill in your Supabase URL and anon key
npm run dev
```

Then open http://localhost:5173.

No database tables are needed: display names, listings and wishlists are stored in the Supabase user's metadata. If your project requires email confirmation, new users are asked to confirm before logging in.

## Scripts

Run from `react-web-store/`:

| Command                | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the dev server                               |
| `npm run build`        | Type-check and build for production                |
| `npm run preview`      | Serve the production build locally                 |
| `npm test`             | Run the test suite once                            |
| `npm run test:watch`   | Run tests in watch mode                            |
| `npm run lint`         | Lint with ESLint                                   |
| `npm run typecheck`    | Type-check with TypeScript                         |
| `npm run format:check` | Check formatting with Prettier (`format` fixes it) |

## Testing

Tests use Vitest and Testing Library and run in CI on every push and pull request, together with formatting, lint, type-check and build. They cover:

- cart reducer, selectors and persisted-state migrations
- form validation schemas
- search matching, redirect and route helpers
- search bar keyboard navigation and the search results page

## Roadmap

- Move listings and wishlists from user metadata into Postgres tables with row-level security, so offers become visible to other shoppers.
- Clear or scope the persisted cart per user on logout.
