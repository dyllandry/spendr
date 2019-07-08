import Transaction from "../../components/Transaction";

export interface Transaction {
    type: TType
    amount: number,
    origin: string,
    message: string,
    date: number,
    status: TStatus
}

export enum TType {
    Deposit = "DEPOSIT",
    Withdrawal = "WITHDRAWAL"
}

export enum TStatus {
    Pending = "PENDING",
    Approved = "APPROVED"
}

export interface TransactionsState {
    [index: string]: Transaction
}

// Action type definitions
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const APPROVE_TRANSACTION = 'APPROVE_TRANSACTION'

interface CreateTransactionAction {
    type: typeof CREATE_TRANSACTION
    payload: {
        id: string,
        transaction: Transaction
    }
}

interface DeleteTransactionAction {
    type: typeof DELETE_TRANSACTION
    payload: string
}

interface ApproveTransactionAction {
    type: typeof APPROVE_TRANSACTION,
    payload: string
}

export type TransactionActionTypes =
    CreateTransactionAction |
    DeleteTransactionAction |
    ApproveTransactionAction