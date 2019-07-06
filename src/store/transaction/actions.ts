import {
  TransactionActionTypes,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION
} from './types'
import { randomBase64 } from '../../base64'

export function createTransaction ({
  type = 'unset',
  amount = 0
}) : TransactionActionTypes {
  return {
    type: CREATE_TRANSACTION,
    payload: {
      id: randomBase64(),
      type,
      amount
    }
  }
}

export function deleteTransaction (id: string) : TransactionActionTypes {
  return {
    type: DELETE_TRANSACTION,
    payload: id
  }
}