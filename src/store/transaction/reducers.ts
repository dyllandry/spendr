import {
  TransactionsState,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  TransactionActionTypes,
  APPROVE_TRANSACTION,
  TStatus,
  DECLINE_TRANSACTION
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
      const { [action.payload.id]: transaction, ...stateToKeep } = state
      return { ...stateToKeep }
    }

    case APPROVE_TRANSACTION: {
      const { [action.payload.id]: transaction, ...stateToKeep } = state
      return {
        ...stateToKeep,
        [action.payload.id]: Object.assign({}, transaction, {
          status: TStatus.Approved,
          statusModifiedAt: action.payload.date
        })
      }
    }

    case DECLINE_TRANSACTION: {
      const { [action.payload.id]: transaction, ...stateToKeep } = state
      return {
        ...stateToKeep,
        [action.payload.id]: Object.assign({}, transaction, {
          status: TStatus.Declined,
          statusModifiedAt: action.payload.date
        })
      }
    }

    default:
      return state
  }
}
