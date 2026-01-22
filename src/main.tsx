import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './shared/styles/variables.css'
import './shared/styles/reset.css'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
