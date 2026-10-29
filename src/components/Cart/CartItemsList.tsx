import { useCartDispatch } from '../../state/context/useCart'
import type { CartItem } from '../../types/cart'
import { formatCurrency } from '../../utils/currency'

interface CartItemsListProps {
  items: CartItem[]
}

export function CartItemsList({ items }: CartItemsListProps) {
  const dispatch = useCartDispatch()

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <span>Add a product to begin your order.</span>
      </div>
    )
  }

  return (
    <ul className="cart-items">
      {items.map((item) => (
        <li key={item.id} className="cart-item">
          <div>
            <h3>{item.name}</h3>
            <p>
              {formatCurrency(item.price)} x {item.quantity}
            </p>
          </div>
          <div className="cart-item__actions">
            <strong>{formatCurrency(item.price * item.quantity)}</strong>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: 'removed', productId: item.id })
              }
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
