import {
  FOCUS_TRANSACTION,
  UNFOCUS_TRANSACTION,
  DetailedTransactionActionTypes
} from "./types";

export function focusTransaction(id: string, elementId: string): DetailedTransactionActionTypes {
  return {
    type: FOCUS_TRANSACTION,
    payload: {
      id,
      elementId
    }
  }
}

export function unfocusTransaction(): DetailedTransactionActionTypes {
  return {
    type: UNFOCUS_TRANSACTION
  }
}