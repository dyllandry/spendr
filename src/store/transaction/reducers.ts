import {
  TransactionsState,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  TransactionActionTypes
} from './types'

const initialState: TransactionsState = []

export default (
  state = initialState,
  action: TransactionActionTypes
) : TransactionsState => {
  switch (action.type) {

    case CREATE_TRANSACTION:
      return [ ...state, action.payload]


    case DELETE_TRANSACTION:
      return state.filter((t) => t.id !== action.payload)

    default:
      return state
    }
}
