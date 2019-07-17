import {
  DetailedTransaction,
  DetailedTransactionActionTypes,
  FOCUS_TRANSACTION,
  UNFOCUS_TRANSACTION
} from "./types";

const initialState: DetailedTransaction = {
  id: null,
  elementId: null
}

export default function (
  state = initialState,
  action: DetailedTransactionActionTypes
): DetailedTransaction {
  switch (action.type) {
    case FOCUS_TRANSACTION:
      return {
        id: action.payload.id,
        elementId: action.payload.elementId
      }
    case UNFOCUS_TRANSACTION:
      return {
        id: null,
        elementId: null
      }
    default:
      return state
  }
}