import { configureStore } from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './store'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['sidebar', 'product', 'general']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

const persistor = persistStore(store)

export { persistor, store }
