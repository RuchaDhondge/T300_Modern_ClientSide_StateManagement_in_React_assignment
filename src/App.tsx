import { CartDrawer } from './components/Cart/CartDrawer'
import { Catalog } from './components/Catalog/Catalog'
import { Header } from './components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <main className="app-layout">
        <Catalog />
        <CartDrawer />
      </main>
    </>
  )
}

export default App
