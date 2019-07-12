import { combineReducers } from 'redux'
import balanceReducer from './balance/reducers'
import transactionsReducer from './transaction/reducers'
import tFilterReducer from "./tFilter/reducer";
import detailedTransactionReducer from './detailedTransaction/reducer'

export const rootReducer = combineReducers({
  balance: balanceReducer,
  transactions: transactionsReducer,
  tFilter: tFilterReducer,
  detailedTransaction: detailedTransactionReducer
})

export type AppState = ReturnType<typeof rootReducer>