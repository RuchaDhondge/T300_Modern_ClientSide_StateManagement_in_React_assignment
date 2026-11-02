# ShopCart

ShopCart is a React and TypeScript shopping-cart application demonstrating
client-side state management patterns. This branch combines Zustand cart state
with an XState v5 checkout workflow.

## Requirements

- Node.js
- npm

## Run locally

Install dependencies:

```bash
npm install
```

Start the delayed mock REST API:

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

## XState checkout workflow

The checkout machine models review, payment submission, and terminal success
states. A guard prevents empty-cart submission, and UI controls query the
machine with `snapshot.can({ type: 'SUBMIT' })` rather than duplicating the
business rule.

Payment is invoked as a promise actor that posts to `/api/orders`. Leaving the
submitting state through `CANCEL` aborts the request with the actor's native
`AbortSignal`. Failed requests return to review while retaining an error
message.

One shared checkout actor serves the cart and payment panels. A headless
synchronizer sends Zustand cart updates to the machine, while a completion
bridge listens for the machine's success event and clears the Zustand cart.

## Verify cancellation

1. Add a product to the cart.
2. Open browser DevTools and select the Network tab.
3. Select **Submit payment**.
4. Select **Cancel** before the configured 1.5-second API delay completes.
5. Confirm the request is marked as canceled and the UI returns to review.
