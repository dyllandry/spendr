import { combineReducers } from 'redux'
import balanceReducer from './balance/reducers'
import transactionsReducer from './transaction/reducers'
import tFilterReducer from "./tFilter/reducer";

export const rootReducer = combineReducers({
  balance: balanceReducer,
  transactions: transactionsReducer,
  tFilter: tFilterReducer
})

export type AppState = ReturnType<typeof rootReducer>