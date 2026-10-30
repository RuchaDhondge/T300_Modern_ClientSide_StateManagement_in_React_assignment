import { useCartStore } from '../../state/zustand/cartStore'
import type { Product } from '../../types/cart'
import { formatCurrency } from '../../utils/currency'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className="product-card">
      <div className="product-card__visual" aria-hidden="true">
        {product.name.charAt(0)}
      </div>
      <div className="product-card__content">
        <h3>{product.name}</h3>
        <p>{formatCurrency(product.price)}</p>
        <button type="button" onClick={() => addItem(product)}>
          Add to cart
        </button>
      </div>
    </article>
  )
}
