import { useAtomValue, useSetAtom } from 'jotai'
import {
  cartItemCountAtom,
  cartTotalAtom,
  clearCartAtom,
} from '../../state/jotai/cartAtoms'
import { formatCurrency } from '../../utils/currency'
import { CartItemsList } from './CartItemsList'

export function CartDrawer() {
  const itemCount = useAtomValue(cartItemCountAtom)
  const total = useAtomValue(cartTotalAtom)
  const clearCart = useSetAtom(clearCartAtom)

  return (
    <aside className="cart-drawer" aria-labelledby="cart-heading">
      <div className="cart-drawer__heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h2 id="cart-heading">Shopping cart</h2>
        </div>
        <span>{itemCount} items</span>
      </div>

      <CartItemsList />

      <div className="cart-summary">
        <div>
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <div className="cart-summary__actions">
          <button
            className="secondary-button"
            type="button"
            disabled={itemCount === 0}
            onClick={() => clearCart()}
          >
            Clear cart
          </button>
          <button type="button" disabled={itemCount === 0}>
            Checkout
          </button>
        </div>
      </div>
    </aside>
  )
}
