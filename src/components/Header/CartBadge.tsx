import { useCartState } from '../../state/context/useCart'

export function CartBadge() {
  const { items } = useCartState()
  const count = items.reduce(
    (itemCount, item) => itemCount + item.quantity,
    0,
  )

  return (
    <span className="cart-badge" aria-label={`${count} items in cart`}>
      Cart
      <span className="cart-badge__count">{count}</span>
    </span>
  )
}
