export interface DetailedTransaction {
  id: string | null,
  elementId: string | null
}

export const FOCUS_TRANSACTION = 'FOCUS_TRANSACTION'
export const UNFOCUS_TRANSACTION = 'UNFOCUS_TRANSACTION'

interface FocusTransactionAction {
  type: typeof FOCUS_TRANSACTION
  payload: DetailedTransaction
}

interface UnfocusTransactionAction {
  type: typeof UNFOCUS_TRANSACTION
}

export type DetailedTransactionActionTypes =
  FocusTransactionAction |
  UnfocusTransactionAction