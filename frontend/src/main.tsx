import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeProvider.tsx'
import { I18nProvider } from './contexts/I18nProvider.tsx'
import { CurrencyProvider } from './contexts/CurrencyProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>,
)