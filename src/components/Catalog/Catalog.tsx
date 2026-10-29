import { useEffect, useState } from 'react'
import { fetchProducts } from '../../api/products'
import type { Product } from '../../types/cart'
import { ProductCard } from './ProductCard'

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        setError(null)
        const catalog = await fetchProducts(controller.signal)
        setProducts(catalog)
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') {
          return
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load products',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [])

  return (
    <section className="catalog" aria-labelledby="catalog-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Workspace essentials</p>
          <h1 id="catalog-heading">Build your ideal setup</h1>
        </div>
        <p>Reliable tools selected for productive, comfortable work.</p>
      </div>

      {isLoading && <p className="status-message">Loading products...</p>}

      {error && (
        <p className="status-message status-message--error" role="alert">
          {error}. Confirm that the mock API is running.
        </p>
      )}

      {!isLoading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
