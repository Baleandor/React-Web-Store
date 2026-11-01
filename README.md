# React Web Store Documentation

# DISCLAIMER! If the app does not connect to the supabase backend, it means the free instance of that database has been frozen and I need to unfreeze it manually. Please contact me via email so that I can do so when needed. Thanks!

## Summary

The React Web Store is an online marketplace inspired by eBay, providing users with a platform to buy and sell items. This application offers a wide range of features to enhance user experience, including user authentication, favorites management, cart functionality, item selling, and a robust search system. Built with React 19 and TypeScript, the app uses Supabase, TanStack Query, Redux Toolkit, React Router and more to create a seamless and efficient online shopping environment.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Features](#features)
  - [User Authentication](#user-authentication)
  - [Favorites Management](#favorites-management)
  - [Cart Functionality](#cart-functionality)
  - [Item Selling](#item-selling)
  - [Search System](#search-system)
- [Dependencies](#dependencies)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd react-web-store
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env.local` and fill in your Supabase project URL and anon key.

Requires Node.js 22.22 or newer.

### Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your web browser and navigate to `http://localhost:5173` to access the React Web Store.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run typecheck`, `npm run format`.

## Features

### User Authentication

- Users can register, log in, and log out of their accounts.
- Secure authentication is implemented using Supabase, ensuring user data safety.

### Favorites Management

- Users can save items to their favorites for quick access.
- This feature enhances user convenience when revisiting products of interest.

### Cart Functionality

- Users can add and remove items to/from their cart.
- The cart offers versatile actions: adding and removing items by 1, removing a single count of an item, removing all items of the same name, and clearing the cart entirely.

### Item Selling

- Users can upload their own items to sell on the platform.
- This functionality allows users to engage in selling and contribute to the marketplace.

### Search System

- The search bar enables users to search for items based on keywords.
- As-you-type suggestions are debounced and keyboard navigable (arrow keys, Enter, Escape); pressing Enter opens a full results page.

## Dependencies

The React Web Store app relies on several essential libraries to deliver a comprehensive and user-friendly marketplace:

- **React 19 + TypeScript:** UI and type safety, bundled with **Vite**.

- **Supabase:** Authentication and user data storage.

- **TanStack Query:** Asynchronous data fetching, caching and mutations for the Fake Store API and Supabase user data.

- **Redux Toolkit + Redux Persist:** Client state - the shopping cart (persisted to localStorage), auth session and notifications.

- **React Router:** Data router with code-split, lazily loaded pages and protected routes.

- **React Hook Form + Zod:** Form handling with schema validation.

- **Tailwind CSS 4:** Styling.

- **ESLint + Prettier:** Linting and formatting.

These dependencies, along with others listed in the `package.json` file, contribute to the app's functionality and aesthetic. For detailed information about each library, please refer to the respective documentation.
