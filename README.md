# ShopCart

ShopCart is a React and TypeScript shopping-cart application demonstrating
client-side state management patterns. This branch implements the cart with
Zustand.

## Requirements

- Node.js
- npm

## Run locally

Install dependencies:

```bash
npm install
```

Start the mock REST API:

```bash
npm run server
```

In a second terminal, start the Vite application:

```bash
npm run dev
```

The frontend runs at <http://localhost:5173> and proxies `/api` requests to
`json-server` at <http://localhost:3001>.

## Available scripts

```bash
npm run dev
npm run server
npm run build
npm run preview
```

## Zustand implementation

The cart uses one typed Zustand store with selector-based subscriptions.
Derived item-count and total values are calculated by selectors rather than
stored separately. Components that only trigger actions subscribe only to
those actions, while grouped selections use shallow comparison.

Checkout is implemented as an asynchronous store action that reads the current
cart, posts the order to `/api/orders`, and transitions through idle,
submitting, success, and error states.
