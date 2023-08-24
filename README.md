# React Web Store Documentation

## Summary

The React Web Store is an online marketplace inspired by eBay, providing users with a platform to buy and sell items. This application offers a wide range of features to enhance user experience, including user authentication, favorites management, cart functionality, item selling, and a robust search system. Built using React, the app utilizes key libraries such as Supabase, React Query, Axios, and more to create a seamless and efficient online shopping environment.

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

### Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your web browser and navigate to `http://localhost:3000` to access the React Web Store.

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
- The search system is enhanced using libraries like `match-sorter` and `lodash` to provide a smooth and efficient experience.

## Dependencies

The React Web Store app relies on several essential libraries to deliver a comprehensive and user-friendly marketplace:

- **Supabase:** A backend service platform offering authentication, database management, and more.

- **React Query:** A powerful library for handling asynchronous data fetching and caching in React applications, contributing to performance optimization.

- **Axios:** A promise-based HTTP client that simplifies making API requests.

- **React Router Dom:** A routing library for React applications, enabling seamless navigation between pages.

- **Lodash:** A utility library that offers a wide range of functions to manipulate and work with arrays, objects, and more.

- **Match-sorter:** A library that provides advanced sorting and filtering capabilities for lists of data.

These dependencies, along with others listed in the `package.json` file, contribute to the app's functionality and aesthetic. For detailed information about each library, please refer to the respective documentation.
