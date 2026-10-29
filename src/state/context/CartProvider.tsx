import { useReducer, type ReactNode } from 'react'
import { CartDispatchContext, CartStateContext } from './cartContexts'
import { cartReducer, initialCartState } from './cartReducer'

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}
