# ShopCart

ShopCart is a React and TypeScript shopping-cart application demonstrating
client-side state management patterns. This branch implements the cart with
React Context and `useReducer`.

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

## Context implementation

Cart transitions are handled by a pure reducer. State and dispatch are exposed
through separate contexts so components that only dispatch actions do not
subscribe to cart-state updates. Guarded custom hooks report a clear error when
used outside `CartProvider`.
