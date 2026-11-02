import { assign, emit, fromPromise, setup } from 'xstate'
import { createOrder } from '../../api/orders'
import type { CartItem, CheckoutResult } from '../../types/cart'

interface CheckoutContext {
  items: CartItem[]
  errorMessage: string | null
  orderResult: CheckoutResult | null
}

interface CheckoutInput {
  initialItems: CartItem[]
}

type CheckoutEvent =
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' }
  | { type: 'SYNC_ITEMS'; items: CartItem[] }

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    input: {} as CheckoutInput,
    output: {} as CheckoutResult,
    events: {} as CheckoutEvent,
    emitted: {} as {
      type: 'orderSuccess'
      orderId: string | number
    },
  },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
  },
  actors: {
    submitOrder: fromPromise(
      async ({
        input,
        signal,
      }: {
        input: { items: CartItem[] }
        signal: AbortSignal
      }) => {
        const total = input.items.reduce(
          (cartTotal, item) => cartTotal + item.price * item.quantity,
          0,
        )

        return createOrder(
          {
            items: input.items,
            total,
          },
          signal,
        )
      },
    ),
  },
}).createMachine({
  id: 'checkout',
  initial: 'review',
  context: ({ input }) => ({
    items: input.initialItems,
    errorMessage: null,
    orderResult: null,
  }),
  on: {
    SYNC_ITEMS: {
      actions: assign({
        items: ({ event }) => event.items,
      }),
    },
  },
  states: {
    review: {
      on: {
        SUBMIT: {
          target: 'submitting',
          guard: 'hasItems',
          actions: assign({
            errorMessage: null,
            orderResult: null,
          }),
        },
      },
    },
    submitting: {
      invoke: {
        id: 'orderSubmission',
        src: 'submitOrder',
        input: ({ context }) => ({
          items: context.items,
        }),
        onDone: {
          target: 'success',
          actions: assign({
            orderResult: ({ event }) => event.output,
            errorMessage: null,
          }),
        },
        onError: {
          target: 'review',
          actions: assign({
            errorMessage: ({ event }) =>
              event.error instanceof Error
                ? event.error.message
                : 'Payment submission failed.',
          }),
        },
      },
      on: {
        CANCEL: {
          target: 'review',
        },
      },
    },
    success: {
      type: 'final',
      output: ({ context }) => context.orderResult!,
      entry: emit(({ context }) => ({
        type: 'orderSuccess',
        orderId: context.orderResult!.id,
      })),
    },
  },
})
