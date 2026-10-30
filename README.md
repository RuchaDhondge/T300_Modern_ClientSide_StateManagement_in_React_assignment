# ShopCart

ShopCart is a React and TypeScript shopping-cart application demonstrating
client-side state management patterns. This branch implements the cart with
Jotai.

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

## Jotai implementation

Cart items are held in a primitive atom. Total item count and total price are
derived atoms that recompute automatically when the cart changes without
duplicating state or requiring component-level memoization.

Add, remove, and clear operations use write-only atoms. Display components use
`useAtomValue`, while action-only components use `useSetAtom` so they do not
subscribe to cart value changes.
