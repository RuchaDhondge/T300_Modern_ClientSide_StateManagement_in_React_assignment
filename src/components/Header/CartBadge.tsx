import { useAtomValue } from 'jotai'
import { cartItemCountAtom } from '../../state/jotai/cartAtoms'

export function CartBadge() {
  const count = useAtomValue(cartItemCountAtom)

  return (
    <span className="cart-badge" aria-label={`${count} items in cart`}>
      Cart
      <span className="cart-badge__count">{count}</span>
    </span>
  )
}
