import type { SnapshotFrom } from 'xstate'
import { CheckoutContext } from '../../state/xstate/CheckoutContext'
import { checkoutMachine } from '../../state/xstate/checkoutMachine'

type CheckoutSnapshot = SnapshotFrom<typeof checkoutMachine>

const selectErrorMessage = (snapshot: CheckoutSnapshot) =>
  snapshot.context.errorMessage

export function CartErrorBanner() {
  const errorMessage = CheckoutContext.useSelector(selectErrorMessage)

  if (!errorMessage) {
    return null
  }

  return (
    <p className="checkout-message checkout-message--error" role="alert">
      {errorMessage}
    </p>
  )
}
