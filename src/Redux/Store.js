import { rootReducer } from "./Reduser"
import { thunk } from "redux-thunk"
import { applyMiddleware, createStore } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: [ 'cart', 'checkout', 'favorite']
}



const persistedReducer = persistReducer(persistConfig, rootReducer)

export const storeData = () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}