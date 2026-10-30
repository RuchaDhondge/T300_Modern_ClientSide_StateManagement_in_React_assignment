import { atom } from 'jotai'
import type { CartItem, Product } from '../../types/cart'

export const cartItemsAtom = atom<CartItem[]>([])

export const cartItemCountAtom = atom((get) =>
  get(cartItemsAtom).reduce(
    (itemCount, item) => itemCount + item.quantity,
    0,
  ),
)

export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce(
    (cartTotal, item) => cartTotal + item.price * item.quantity,
    0,
  ),
)

export const addItemAtom = atom(
  null,
  (get, set, product: Product) => {
    const items = get(cartItemsAtom)
    const existingItem = items.find((item) => item.id === product.id)

    set(
      cartItemsAtom,
      existingItem
        ? items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...items, { ...product, quantity: 1 }],
    )
  },
)

export const removeItemAtom = atom(
  null,
  (_get, set, productId: string) => {
    set(cartItemsAtom, (items) =>
      items.filter((item) => item.id !== productId),
    )
  },
)

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, [])
})
