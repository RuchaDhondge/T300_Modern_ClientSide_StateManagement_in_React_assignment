import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CheckoutContext } from './state/xstate/CheckoutContext.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CheckoutContext.Provider options={{ input: { initialItems: [] } }}>
      <App />
    </CheckoutContext.Provider>
  </StrictMode>,
)
