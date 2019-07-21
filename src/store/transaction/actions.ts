import {
  TransactionActionTypes,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  TType,
  TStatus,
  APPROVE_TRANSACTION,
  DECLINE_TRANSACTION
} from './types'
import { randomBase64 } from '../../scripts/base64'

export function createTransaction({
  type = TType.Deposit,
  amount = 0,
  origin = 'Bill',
  message = '',
  date = Date.now(),
  status = TStatus.Pending,
  subject = ''

} = {}): TransactionActionTypes {
  return {
    type: CREATE_TRANSACTION,
    payload: {
      id: randomBase64(),
      transaction: {
        type,
        amount,
        origin,
        message,
        status,
        date,
        subject,
        statusModifiedAt: date
      }
    }
  }
}

export function deleteTransaction(id: string): TransactionActionTypes {
  return {
    type: DELETE_TRANSACTION,
    payload: {
      id
    }
  }
}

export function approveTransaction(id: string, date: number): TransactionActionTypes {
  return {
    type: APPROVE_TRANSACTION,
    payload: {
      id,
      date
    }
  }
}

export function declineTransaction(id: string, date: number): TransactionActionTypes {
  return {
    type: DECLINE_TRANSACTION,
    payload: {
      id,
      date
    }
  }
}
