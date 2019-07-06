import Transaction from "../../components/Transaction";

export interface Transaction {
    id: string
    type: string
    amount: number
}

export type TransactionsState = Transaction[]

// Action type definitions
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'

interface CreateTransactionAction {
    type: typeof CREATE_TRANSACTION
    payload: Transaction
}

interface DeleteTransactionAction {
    type: typeof DELETE_TRANSACTION
    payload: string
}

export type TransactionActionTypes = 
    CreateTransactionAction | 
    DeleteTransactionAction