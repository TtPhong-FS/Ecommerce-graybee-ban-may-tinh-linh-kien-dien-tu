import { configureStore } from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'
import rootReducer from './store'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(thunk)
})

const persistor = persistStore(store)

export { persistor, store }
