import { useEffect } from 'react'
import { useCartStore } from '../zustand/cartStore'
import { CheckoutContext } from './CheckoutContext'

export function CartSynchronizer() {
  const actorRef = CheckoutContext.useActorRef()
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    actorRef.send({
      type: 'SYNC_ITEMS',
      items,
    })
  }, [actorRef, items])

  return null
}
