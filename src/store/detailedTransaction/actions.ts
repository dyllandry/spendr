import {
  FOCUS_TRANSACTION,
  UNFOCUS_TRANSACTION,
  DetailedTransactionActionTypes
} from "./types";

export function focusTransaction(id: string): DetailedTransactionActionTypes {
  return {
    type: FOCUS_TRANSACTION,
    payload: {
      id
    }
  }
}

export function unfocusTransaction(): DetailedTransactionActionTypes {
  return {
    type: UNFOCUS_TRANSACTION
  }
}