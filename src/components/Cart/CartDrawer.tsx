import {
  selectCartTotal,
  useCartStore,
} from '../../state/zustand/cartStore'
import { formatCurrency } from '../../utils/currency'
import { CartErrorBanner } from './CartErrorBanner'
import { CartItemsList } from './CartItemsList'
import { CheckoutButton } from './CheckoutButton'

export function CartDrawer() {
  const productCount = useCartStore((state) => state.items.length)
  const total = useCartStore(selectCartTotal)

  return (
    <aside className="cart-drawer" aria-labelledby="cart-heading">
      <div className="cart-drawer__heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h2 id="cart-heading">Shopping cart</h2>
        </div>
        <span>{productCount} products</span>
      </div>

      <CartItemsList />

      <div className="cart-summary">
        <div>
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <CartErrorBanner />
        <CheckoutButton />
      </div>
    </aside>
  )
}
