import type { SnapshotFrom } from 'xstate'
import { CheckoutContext } from '../../state/xstate/CheckoutContext'
import { checkoutMachine } from '../../state/xstate/checkoutMachine'

type CheckoutSnapshot = SnapshotFrom<typeof checkoutMachine>

const selectCanSubmit = (snapshot: CheckoutSnapshot) =>
  snapshot.can({ type: 'SUBMIT' })

const selectIsSubmitting = (snapshot: CheckoutSnapshot) =>
  snapshot.matches('submitting')

const selectIsSuccessful = (snapshot: CheckoutSnapshot) =>
  snapshot.matches('success')

export function CheckoutButton() {
  const actorRef = CheckoutContext.useActorRef()
  const canSubmit = CheckoutContext.useSelector(selectCanSubmit)
  const isSubmitting = CheckoutContext.useSelector(selectIsSubmitting)
  const isSuccessful = CheckoutContext.useSelector(selectIsSuccessful)

  return (
    <button
      type="button"
      disabled={!canSubmit}
      onClick={() => actorRef.send({ type: 'SUBMIT' })}
    >
      {isSubmitting
        ? 'Submitting...'
        : isSuccessful
          ? 'Order complete'
          : 'Checkout'}
    </button>
  )
}
