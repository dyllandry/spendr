export interface DetailedTransaction {
  id: string | null,
  elementId: string | null,
  lastSelectedId: string | null
}

export const SELECT_TRANSACTION = 'SELECT_TRANSACTION'
export const DESELECT_TRANSACTION = 'DESELECT_TRANSACTION'

interface SelectTransactionAction {
  type: typeof SELECT_TRANSACTION
  payload: DetailedTransaction
}

interface DeselectTransactionAction {
  type: typeof DESELECT_TRANSACTION
}

export type DetailedTransactionActionTypes =
  SelectTransactionAction |
  DeselectTransactionAction
