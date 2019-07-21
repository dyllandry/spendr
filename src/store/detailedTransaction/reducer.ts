import {
  DetailedTransaction,
  DetailedTransactionActionTypes,
  SELECT_TRANSACTION,
  DESELECT_TRANSACTION
} from "./types";

const initialState: DetailedTransaction = {
  id: null,
  elementId: null,
  lastSelectedId: null
}

export default function (
  state = initialState,
  action: DetailedTransactionActionTypes
): DetailedTransaction {
  switch (action.type) {
    case SELECT_TRANSACTION:
      return {
        id: action.payload.id,
        elementId: action.payload.elementId,
        lastSelectedId: action.payload.id
      }
    case DESELECT_TRANSACTION:
      return {
        id: null,
        elementId: null,
        lastSelectedId: state.lastSelectedId
      }
    default:
      return state
  }
}
