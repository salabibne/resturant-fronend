import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Routes from './Routes/Routes.tsx'
import { Provider } from 'react-redux'
import Store from './Store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      <Routes />
    </Provider>
   
  </StrictMode>,
)
