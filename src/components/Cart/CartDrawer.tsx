import { formatCurrency } from '../../utils/currency'
import { CartItemsList } from './CartItemsList'

export function CartDrawer() {
  return (
    <aside className="cart-drawer" aria-labelledby="cart-heading">
      <div className="cart-drawer__heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h2 id="cart-heading">Shopping cart</h2>
        </div>
        <span>0 products</span>
      </div>

      <CartItemsList />

      <div className="cart-summary">
        <div>
          <span>Total</span>
          <strong>{formatCurrency(0)}</strong>
        </div>
        <button type="button" disabled>
          Checkout
        </button>
      </div>
    </aside>
  )
}
