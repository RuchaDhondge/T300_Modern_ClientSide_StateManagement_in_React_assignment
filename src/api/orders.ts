import type { CheckoutResult, OrderPayload } from '../types/cart'

export async function createOrder(
  order: OrderPayload,
  signal?: AbortSignal,
): Promise<CheckoutResult> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Unable to create order (${response.status})`)
  }

  return response.json() as Promise<CheckoutResult>
}
