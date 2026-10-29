import { useCartState } from '../../state/context/useCart'
import { formatCurrency } from '../../utils/currency'
import { CartItemsList } from './CartItemsList'

export function CartDrawer() {
  const { items } = useCartState()
  const total = items.reduce(
    (cartTotal, item) => cartTotal + item.price * item.quantity,
    0,
  )

  return (
    <aside className="cart-drawer" aria-labelledby="cart-heading">
      <div className="cart-drawer__heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h2 id="cart-heading">Shopping cart</h2>
        </div>
        <span>{items.length} products</span>
      </div>

      <CartItemsList items={items} />

      <div className="cart-summary">
        <div>
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <button type="button" disabled={items.length === 0}>
          Checkout
        </button>
      </div>
    </aside>
  )
}
