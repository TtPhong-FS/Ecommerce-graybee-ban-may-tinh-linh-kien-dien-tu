import i18n from '@/i18n/i18n'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './rootReducer'

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
      serializableCheck: false,
      thunk: {
        extraArgument: {
          t: i18n.t.bind(i18n)
        }
      }
    })
})

const persistor = persistStore(store)

export { persistor, store }
