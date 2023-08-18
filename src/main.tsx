import React from 'react'
import ReactDOM from 'react-dom/client'
import '@unocss/reset/tailwind-compat.css'
import { RouterProvider } from "react-router-dom";
import './index.css'
import 'virtual:uno.css'
import router from './routes.tsx'
import { ReactFlowProvider } from 'reactflow';

// Detect dark mode ref: https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
const body = document.querySelector('body') as HTMLBodyElement
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
body.classList.toggle('dark', prefersDark)

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
   const prefersDark = event.matches
   body.classList.toggle('dark', prefersDark)
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <RouterProvider router={router} />
    </ReactFlowProvider>
  </React.StrictMode>,
)
