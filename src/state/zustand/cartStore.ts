import { create } from 'zustand'
import { createOrder } from '../../api/orders'
import type { CartItem, CheckoutResult, Product } from '../../types/cart'

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error'

interface CartStore {
  items: CartItem[]
  checkoutStatus: CheckoutStatus
  checkoutError: string | null
  checkoutResult: CheckoutResult | null
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  checkout: () => Promise<void>
}

export const selectCartItemCount = (state: CartStore) =>
  state.items.reduce(
    (itemCount, item) => itemCount + item.quantity,
    0,
  )

export const selectCartTotal = (state: CartStore) =>
  state.items.reduce(
    (cartTotal, item) => cartTotal + item.price * item.quantity,
    0,
  )

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  checkoutStatus: 'idle',
  checkoutError: null,
  checkoutResult: null,
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)
      const items = existingItem
        ? state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.items, { ...product, quantity: 1 }]

      return {
        items,
        checkoutStatus: 'idle',
        checkoutError: null,
        checkoutResult: null,
      }
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
      checkoutStatus: 'idle',
      checkoutError: null,
      checkoutResult: null,
    })),
  clearCart: () =>
    set({
      items: [],
      checkoutStatus: 'idle',
      checkoutError: null,
      checkoutResult: null,
    }),
  checkout: async () => {
    const items = get().items
    const total = selectCartTotal(get())

    if (items.length === 0) {
      set({
        checkoutStatus: 'error',
        checkoutError: 'Add at least one product before checking out.',
        checkoutResult: null,
      })
      return
    }

    set({
      checkoutStatus: 'submitting',
      checkoutError: null,
      checkoutResult: null,
    })

    try {
      const result = await createOrder({
        items,
        total,
      })

      set({
        items: [],
        checkoutStatus: 'success',
        checkoutResult: result,
      })
    } catch (error) {
      set({
        checkoutStatus: 'error',
        checkoutError:
          error instanceof Error ? error.message : 'Unable to submit order.',
        checkoutResult: null,
      })
    }
  },
}))
