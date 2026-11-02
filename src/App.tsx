import { CartDrawer } from './components/Cart/CartDrawer'
import { Catalog } from './components/Catalog/Catalog'
import { Header } from './components/Header/Header'
import { PaymentPanel } from './components/Payment/PaymentPanel'
import { CartSynchronizer } from './state/xstate/CartSynchronizer'
import { OrderCompletionBridge } from './state/xstate/OrderCompletionBridge'

function App() {
  return (
    <>
      <CartSynchronizer />
      <OrderCompletionBridge />
      <Header />
      <main className="app-layout">
        <Catalog />
        <CartDrawer />
        <PaymentPanel />
      </main>
    </>
  )
}

export default App
