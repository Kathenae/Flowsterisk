import React from 'react'
import ReactDOM from 'react-dom/client'
import '@unocss/reset/tailwind-compat.css'
import { RouterProvider } from "react-router-dom";
import './index.css'
import 'virtual:uno.css'
import router from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
