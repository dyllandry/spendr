import {
  TransactionsState,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  TransactionActionTypes,
  APPROVE_TRANSACTION,
  TStatus
} from './types'

const initialState: TransactionsState = {}

export default (
  state = initialState,
  action: TransactionActionTypes
): TransactionsState => {
  switch (action.type) {

    case CREATE_TRANSACTION:
      return {
        ...state,
        [action.payload.id]: action.payload.transaction
      }


    case DELETE_TRANSACTION: {
      const { [action.payload]: transaction, ...stateToKeep } = state
      return { ...stateToKeep }
    }

    case APPROVE_TRANSACTION: {
      const { [action.payload]: transaction, ...stateToKeep } = state
      return {
        ...stateToKeep,
        [action.payload]: Object.assign({}, transaction, {
          status: TStatus.Approved
        })
      }
    }
    default:
      return state
  }
}
