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
import Media from 'react-media'
import FormattedDate from './FormattedDate'
import { AppState } from '../store';

function Transaction({
  id,
  type,
  amount,
  origin,
  approve,
  status,
  date: dateMs,
  subject,
  onClick,
  focused
}: {
  id: string,
  type: TType,
  amount: number,
  origin: string,
  approve: (id: string, type: TType, amount: number) => void,
  status: TStatus,
  date: number,
  subject: string,
  onClick: () => void,
  focused: (id: string) => boolean
}) {
  return (
    <li
      className={
        focused(id)
          ? styles.focusedTransaction
          : styles.transaction
      }
      onClick={onClick}
    >
      <Media query='(min-width: 500px)'>
        <div className={styles.desktopTransaction}>
          <Origin origin={origin} />
          <Amount amount={amount} type={type} />
          <Subject subject={subject} />
          <FormattedDate
            itemDate={new Date(dateMs)}
            nowDate={new Date(Date.now())}
            className={styles.date}
          />
        </div>
      </Media>
      <Media query='(max-width: 499px)'>
        <div className={styles.mobileTransaction}>
          <span className={styles.mobileTopFlex}>
            <Origin origin={origin} />
            <FormattedDate
              itemDate={new Date(dateMs)}
              nowDate={new Date(Date.now())}
              className={styles.date}
            />
          </span>
          <span className={styles.mobileBottomFlex}>
            <Amount amount={amount} type={type} />
            <Subject subject={subject} />
          </span>
        </div>
      </Media>
    </li>
  )
}

function Subject({
  subject,
}: {
  subject: string
}) {
  return (
    <span className={styles.subject}>
      {subject}
    </span>
  )
}

function Origin({
  origin,
}: {
  origin: string
}) {
  return (
    <span className={styles.origin}>
      {origin}
    </span>
  )
}

function Amount({
  amount,
  type,
}: {
  amount: number,
  type: TType
}) {
  return (
    <span className={styles.amount}>
      <span className={styles.amountSign}>
        {type === TType.Deposit ? '+' : '-'}
      </span>
      <span className={styles.amountQuantity}>
        ${amount.toFixed(2)}
      </span>
    </span>
  )
}

const mapStateToProps = (state: AppState) => ({
  focused: (id: string) => state.detailedTransaction === id
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
