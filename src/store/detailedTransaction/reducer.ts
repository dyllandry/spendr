import {
  DetailedTransaction,
  DetailedTransactionActionTypes,
  FOCUS_TRANSACTION,
  UNFOCUS_TRANSACTION
} from "./types";

const initialState: DetailedTransaction = null

export default function (
  state = initialState,
  action: DetailedTransactionActionTypes
): DetailedTransaction {
  switch (action.type) {
    case FOCUS_TRANSACTION:
      return action.payload.id
    case UNFOCUS_TRANSACTION:
      return null
    default:
      return state
  }
}