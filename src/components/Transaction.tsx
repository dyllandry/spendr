import React from 'react'
import styles from './Transaction.module.css'
import { TType, TStatus } from './../store/transaction/types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { approveTransaction } from '../store/transaction/actions'
import {
  increaseBalance,
  decreaseBalance
} from "../store/balance/actions";

type Approve = (id: string, type: TType, amount: number) => void

function Transaction({
  id,
  type,
  amount,
  origin,
  approve,
  status,
}: {
  id: string,
  type: TType,
  amount: number,
  origin: string,
  approve: Approve,
  status: TStatus,
}) {
  return (
    <li className={styles.transaction}>
      {type === TType.Deposit ? '+' : '-'}${amount.toFixed(2)} from: {origin}
      <button
        onClick={() => approve(id, type, amount)}
        style={{
          display: status === TStatus.Pending ? 'inline-block' : 'none'
        }}
      >
        Approve
      </button>
    </li>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  approve: (id: string, type: TType, amount: number) => {
    dispatch(approveTransaction(id))
    switch (type) {
      case TType.Deposit:
        dispatch(increaseBalance(amount))
        break
      case TType.Withdrawal:
        dispatch(decreaseBalance(amount))
        break
    }
  }
})

export default connect(null, mapDispatchToProps)(Transaction)
