import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <App />
      <Toaster duration={1000} position="top-right" />
    </ThemeProvider>
  </Provider>
)
