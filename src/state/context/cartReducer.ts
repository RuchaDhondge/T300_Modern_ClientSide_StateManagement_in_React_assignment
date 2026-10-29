import type { CartItem, Product } from '../../types/cart'

export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'added'; product: Product }
  | { type: 'removed'; productId: string }

export const initialCartState: CartState = {
  items: [],
}

export function cartReducer(
  state: CartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case 'added': {
      const existingItem = state.items.find(
        (item) => item.id === action.product.id,
      )

      return {
        items: existingItem
          ? state.items.map((item) =>
              item.id === action.product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.items, { ...action.product, quantity: 1 }],
      }
    }
    case 'removed':
      return {
        items: state.items.filter((item) => item.id !== action.productId),
      }
    default: {
      const unhandledAction: never = action
      throw new Error(
        `Unhandled cart action: ${JSON.stringify(unhandledAction)}`,
      )
    }
  }
}
