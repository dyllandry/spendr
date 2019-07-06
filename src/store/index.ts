import { combineReducers } from 'redux'
import balanceReducer from './balance/reducers'
import transactionsReducer from './transaction/reducers'

export const rootReducer = combineReducers({
  balance: balanceReducer,
  transactions: transactionsReducer
})

export type AppState = ReturnType<typeof rootReducer>