import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import { persistor, store } from './config/persistConfig.js'
import { Theme } from './config/theme.js'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
)
