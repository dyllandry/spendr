// import { combineReducers } from 'redux'
import { balance } from './reducers'
export const rootReducer = balance

// export const rootReducer = combineReducers({
//     balance
// })

export type AppState = ReturnType<typeof rootReducer>