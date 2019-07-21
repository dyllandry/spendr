import {
  SELECT_TRANSACTION,
  DESELECT_TRANSACTION,
  DetailedTransactionActionTypes
} from "./types";

export function selectTransaction(id: string, elementId: string): DetailedTransactionActionTypes {
  return {
    type: SELECT_TRANSACTION,
    payload: {
      id,
      elementId,
      lastSelectedId: id
    }
  }
}

export function deselectTransaction(): DetailedTransactionActionTypes {
  return {
    type: DESELECT_TRANSACTION
  }
}
