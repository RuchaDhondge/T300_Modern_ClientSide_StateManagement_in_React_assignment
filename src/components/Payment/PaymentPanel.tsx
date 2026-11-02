import type { SnapshotFrom } from 'xstate'
import { CheckoutContext } from '../../state/xstate/CheckoutContext'
import { checkoutMachine } from '../../state/xstate/checkoutMachine'

type CheckoutSnapshot = SnapshotFrom<typeof checkoutMachine>

const selectCanSubmit = (snapshot: CheckoutSnapshot) =>
  snapshot.can({ type: 'SUBMIT' })

const selectErrorMessage = (snapshot: CheckoutSnapshot) =>
  snapshot.context.errorMessage

const selectIsSubmitting = (snapshot: CheckoutSnapshot) =>
  snapshot.matches('submitting')

const selectIsSuccessful = (snapshot: CheckoutSnapshot) =>
  snapshot.matches('success')

const selectOrderId = (snapshot: CheckoutSnapshot) =>
  snapshot.context.orderResult?.id ?? null

export function PaymentPanel() {
  const actorRef = CheckoutContext.useActorRef()
  const canSubmit = CheckoutContext.useSelector(selectCanSubmit)
  const errorMessage = CheckoutContext.useSelector(selectErrorMessage)
  const isSubmitting = CheckoutContext.useSelector(selectIsSubmitting)
  const isSuccessful = CheckoutContext.useSelector(selectIsSuccessful)
  const orderId = CheckoutContext.useSelector(selectOrderId)

  return (
    <section className="payment-panel" aria-labelledby="payment-heading">
      <div className="payment-panel__heading">
        <div>
          <p className="eyebrow">Checkout workflow</p>
          <h2 id="payment-heading">Payment</h2>
        </div>
        <span className="payment-status">
          {isSubmitting
            ? 'Processing'
            : isSuccessful
              ? 'Completed'
              : 'Ready'}
        </span>
      </div>

      <p className="payment-panel__description">
        Submit the current cart as an order or cancel while payment is in
        progress.
      </p>

      {errorMessage && (
        <p className="checkout-message checkout-message--error" role="alert">
          {errorMessage}
        </p>
      )}

      {isSuccessful && orderId !== null && (
        <p className="checkout-message checkout-message--success" role="status">
          Order #{orderId} placed successfully.
        </p>
      )}

      <div className="payment-panel__actions">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => actorRef.send({ type: 'SUBMIT' })}
        >
          {isSubmitting ? 'Authorizing...' : 'Submit payment'}
        </button>
        <button
          className="secondary-button"
          type="button"
          disabled={!isSubmitting}
          onClick={() => actorRef.send({ type: 'CANCEL' })}
        >
          Cancel
        </button>
      </div>
    </section>
  )
}
