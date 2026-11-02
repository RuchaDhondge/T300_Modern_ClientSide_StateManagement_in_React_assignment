import { create } from 'zustand'
import type { CartItem, Product } from '../../types/cart'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
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

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)

      return {
        items: existingItem
          ? state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.items, { ...product, quantity: 1 }],
      }
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ items: [] }),
}))
