import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// console.log('DEBUG: VITE_API_URL is:', import.meta.env.VITE_API_URL);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
