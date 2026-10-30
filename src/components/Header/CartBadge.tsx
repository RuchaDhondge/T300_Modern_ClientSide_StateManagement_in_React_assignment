import {
  selectCartItemCount,
  useCartStore,
} from '../../state/zustand/cartStore'

export function CartBadge() {
  const count = useCartStore(selectCartItemCount)

  return (
    <span className="cart-badge" aria-label={`${count} items in cart`}>
      Cart
      <span className="cart-badge__count">{count}</span>
    </span>
  )
}
