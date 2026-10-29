export interface Product {
  id: string
  name: string
  price: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface OrderPayload {
  items: CartItem[]
  total: number
}

export interface CheckoutResult extends OrderPayload {
  id: string | number
}
