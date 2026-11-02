import { useEffect } from 'react'
import { useCartStore } from '../zustand/cartStore'
import { CheckoutContext } from './CheckoutContext'

export function OrderCompletionBridge() {
  const actorRef = CheckoutContext.useActorRef()
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    let cartCleared = false

    const clearCartOnce = () => {
      if (cartCleared) {
        return
      }

      cartCleared = true
      clearCart()
    }

    const eventSubscription = actorRef.on('orderSuccess', clearCartOnce)
    const stateSubscription = actorRef.subscribe((snapshot) => {
      if (snapshot.matches('success')) {
        clearCartOnce()
      }
    })

    return () => {
      eventSubscription.unsubscribe()
      stateSubscription.unsubscribe()
    }
  }, [actorRef, clearCart])

  return null
}
