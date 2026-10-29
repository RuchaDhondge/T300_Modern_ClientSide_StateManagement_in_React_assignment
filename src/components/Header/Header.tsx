import { CartBadge } from './CartBadge'
import { Toolbar } from './Toolbar'

export function Header() {
  return (
    <header className="site-header">
      <Toolbar>
        <a className="brand" href="/" aria-label="ShopCart home">
          ShopCart
        </a>
        <CartBadge />
      </Toolbar>
    </header>
  )
}
