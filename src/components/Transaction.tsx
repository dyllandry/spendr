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

function Transaction({
  id,
  type,
  amount,
  origin,
  approve,
  status,
  date: dateMs,
  subject
}: {
  id: string,
  type: TType,
  amount: number,
  origin: string,
  approve: (id: string, type: TType, amount: number) => void,
  status: TStatus,
  date: number,
  subject: string
}) {
  return (
    <li className={styles.transaction}>
      <Media query='(min-width: 500px)'>
        <div className={styles.desktopTransaction}>
          <Origin origin={origin} />
          <Amount amount={amount} type={type} />
          <Subject subject={subject} />
          <FormattedDate
            itemDate={new Date(dateMs)}
            nowDate={new Date(Date.now())}
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

function FormattedDate({
  itemDate,
  nowDate
}: {
  itemDate: Date,
  nowDate: Date
}) {
  const dateString = getFormattedDateString(itemDate, nowDate)
  return (
    <span className={styles.date}>
      {dateString}
    </span>
  )
}

/**
 * Returns a formatted date string, either in day/month/year or a 00:00 am/pm
 * time if the transaction's date is today.
 * @param tDate {Date} Date of transaction.
 * @param now {Date} Date now.
 * @returns {string} Formatted date string.
 */
function getFormattedDateString(tDate: Date, now: Date): string {
  if (tDate.getDate() === now.getDate()) return getFormattedTimeString(tDate)
  else return `${tDate.getDate()}/${tDate.getMonth() + 1}/${tDate.getFullYear()}`
}

/**
 * Returns a formatted string from a date object as a 00:00 am/pm format.
 * @param date {Date} 
 * @returns {Date} Formatted time.
 */
function getFormattedTimeString(date: Date): string {
  const hours = date.getHours() < 13 ? date.getHours() : date.getHours() % 12
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const amPm = date.getHours() > 11 ? 'pm' : 'am'
  return `${hours}:${minutes} ${amPm}`
}

export default connect(null, mapDispatchToProps)(Transaction)
