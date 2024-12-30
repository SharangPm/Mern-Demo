import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import ContextShares from './contextAPI/ContextShares.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

   <ContextShares>
   <BrowserRouter>
        <App />
      </BrowserRouter>

   </ContextShares>
   
  </StrictMode>,
  
)
