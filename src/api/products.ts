import type { Product } from '../types/cart'

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch('/api/products', { signal })

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status})`)
  }

  return response.json() as Promise<Product[]>
}
