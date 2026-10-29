import { createContext, type Dispatch } from 'react'
import type { CartAction, CartState } from './cartReducer'

export const CartStateContext = createContext<CartState | null>(null)
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(
  null,
)
