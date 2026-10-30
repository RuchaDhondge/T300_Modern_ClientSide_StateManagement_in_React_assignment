import { useShallow } from 'zustand/react/shallow'
import {
  selectCartTotal,
  useCartStore,
} from '../../state/zustand/cartStore'
import { formatCurrency } from '../../utils/currency'
import { CartItemsList } from './CartItemsList'

export function CartDrawer() {
  const productCount = useCartStore((state) => state.items.length)
  const total = useCartStore(selectCartTotal)
  const { checkout, checkoutError, checkoutResult, checkoutStatus } =
    useCartStore(
      useShallow((state) => ({
        checkout: state.checkout,
        checkoutError: state.checkoutError,
        checkoutResult: state.checkoutResult,
        checkoutStatus: state.checkoutStatus,
      })),
    )

  const isSubmitting = checkoutStatus === 'submitting'
  const isSuccessful = checkoutStatus === 'success'

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

        {checkoutStatus === 'error' && checkoutError && (
          <p className="checkout-message checkout-message--error" role="alert">
            {checkoutError}
          </p>
        )}

        {isSuccessful && checkoutResult && (
          <p className="checkout-message checkout-message--success" role="status">
            Order #{checkoutResult.id} placed successfully.
          </p>
        )}

        <button
          type="button"
          disabled={productCount === 0 || isSubmitting || isSuccessful}
          onClick={() => void checkout()}
        >
          {isSubmitting
            ? 'Submitting...'
            : isSuccessful
              ? 'Order complete'
              : 'Checkout'}
        </button>
      </div>
    </aside>
  )
}
