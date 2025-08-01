import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import Inicio from './pages/Inicio.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Inicio />
  </StrictMode>,
)
