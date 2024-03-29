import React, { Fragment, useRef } from 'react'
import { connect } from 'react-redux'
import styles from './TransactionDetail.module.css'
import { DetailedTransaction } from "../store/detailedTransaction/types";
import { AppState } from '../store';
import { Transaction, TStatus, TType } from '../store/transaction/types';
import FormattedDate from './FormattedDate';
import { Dispatch } from 'redux';
import {
  approveTransaction as approveTransactionAction,
  declineTransaction as declineTransactionAction
} from '../store/transaction/actions';
import { increaseBalance, decreaseBalance } from '../store/balance/actions';
import { deselectTransaction } from '../store/detailedTransaction/actions';
const ReactMarkdown = require('react-markdown')

const TransactionDetailView = ({
  detailedTransaction,
  transaction: t,
  approveTransaction,
  declineTransaction,
  increaseBalance,
  decreaseBalance,
  callback,
  deselectTransaction
}: {
  detailedTransaction: DetailedTransaction,
  transaction: Transaction | null,
  approveTransaction: typeof approveTransactionAction,
  declineTransaction: typeof declineTransactionAction,
  increaseBalance: (amount: number) => void,
  decreaseBalance: (amount: number) => void
  callback?: () => void,
  deselectTransaction: () => void
}) => {
  const transactionDetailRef = useRef<HTMLDivElement>(null)
  if (transactionDetailRef.current !== null) {
    transactionDetailRef.current.scrollTop = 0
  }
  const statusModifiedToday = t &&
    new Date(t.statusModifiedAt).getDate() === new Date(Date.now()).getDate()
  return (
    <div
      id='transaction--detail'
      className={styles.default}
      ref={transactionDetailRef}
      aria-labelledby='transaction--dialog-label'
      aria-describedby='transaction--dialog-description'
      role='dialog'
      aria-modal='true'
    >
      <div 
        className='screen-reader-only' 
        id='transaction--dialog-label'
      >
        Transaction Details
      </div> 
      <div className={styles.subject}>
        <span 
          id='transaction--dialog-description'
          tabIndex={0}
        >
          {t && t.subject}
        </span>
        { t && 
          <button
            onClick={() => {
              if (detailedTransaction.id) {
                const lastDetailedTransaction = document.getElementById(detailedTransaction.id)
                if (lastDetailedTransaction) {
                  lastDetailedTransaction.focus()
                }
              }
              deselectTransaction()
            }}
            className={styles.closeButton}
            aria-label='Close transaction detail.'
          >
            X
          </button>
        }
      </div>
      {t === null ? (
        <div id='transaction--dialog-description'>
          Select a transaction to view details.
        </div>
      ) : (
          <Fragment>
            <div className={styles.originContainer}>
              <span className={styles.origin}>
                {t.origin}
              </span>
              <FormattedDate
                itemDate={new Date(t.date)}
                nowDate={new Date(Date.now())}
                className={styles.date}
              />
            </div>
            <div className={styles.message}>
              {
                t.message !== ''
                  ? <ReactMarkdown source={t.message} />
                  : (
                    <div className={styles.noMessage}>
                      No attached message.
                    </div>
                  )
              }
            </div>
            <div className={styles.amountContainer}>
              <div className={styles.amount}>
                <span aria-hidden='true'>
                  {
                    t.type === TType.Deposit
                      ? '+'
                      : '-'
                  }
                </span>
                <span className='screen-reader-only'>{`${t.type.toLowerCase()} of: `}</span>
                {`$${t.amount.toFixed(2)}`}
              </div>
              {t.status !== TStatus.Pending &&
                <div className={styles.statusModifiedAt}>
                  (
                    <span>
                    {
                      t.status.charAt(0)
                        .toUpperCase()
                        .concat(t.status.slice(1).toLowerCase())
                    }
                    {statusModifiedToday ? ' at ' : ' on '}
                    <FormattedDate
                      nowDate={new Date(Date.now())}
                      itemDate={new Date(t.statusModifiedAt)}
                    />
                  </span>
                  )
                </div>
              }
              <div>
                {t.status === TStatus.Pending &&
                  <React.Fragment>
                    <button
                      className={styles.decline}
                      onClick={
                        detailedTransaction.id !== null
                          ? () => {
                            if (detailedTransaction.id !== null) {
                              setAriaLiveFeedback('Transaction declined!')
                              declineTransaction(detailedTransaction.id, Date.now())
                              // Delay allows screen readers to first read aloud
                              // the aria feedback span before announcing
                              // exiting the dialogue and returning to the
                              // transaction list.
                              window.setTimeout(() => focusFirstTransaction(), 100)
                              if (callback) callback()
                            }
                          }
                          : undefined
                      }
                    >
                      Decline
                    </button>
                    <button
                      className={styles.approve}
                      onClick={
                        detailedTransaction.id !== null
                          ? () => {
                            if (detailedTransaction.id !== null) {
                              setAriaLiveFeedback('Transaction approved!')
                              approveTransaction(detailedTransaction.id, Date.now())
                              if (t.type === TType.Deposit) {
                                increaseBalance(t.amount)
                              } else if (t.type === TType.Withdrawal) {
                                decreaseBalance(t.amount)
                              }
                              // Delay allows screen readers to first read aloud
                              // the aria feedback span before announcing
                              // exiting the dialogue and returning to the
                              // transaction list.
                              window.setTimeout(() => focusFirstTransaction(), 100)
                              if (callback) callback()
                            }
                          }
                          : undefined
                      }
                    >
                      Approve
                    </button>
                  </React.Fragment>
                }
              </div>
            </div>
          </Fragment>
        )}
        <span 
          id='aria-live-feedback'
          className='screen-reader-only'
          aria-live='assertive'
        >
        </span>
    </div>
  )
}

function setAriaLiveFeedback(feedback: string): void {
  const ariaLiveFeedback = document.getElementById('aria-live-feedback')
  if (ariaLiveFeedback !== null) ariaLiveFeedback.innerHTML = feedback
}

function focusFirstTransaction () {
  const transactionAtIndex = document.querySelector<HTMLElement>(`#transactions-list li:first-child button`)
  console.log(transactionAtIndex)
  if (transactionAtIndex) transactionAtIndex.focus()
}

const mapStateToProps = (state: AppState) => ({
  detailedTransaction: state.detailedTransaction,
  transaction: state.detailedTransaction.id !== null
    ? state.transactions[state.detailedTransaction.id]
    : null
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  approveTransaction: (id: string, date: number) => dispatch(approveTransactionAction(id, date)),
  declineTransaction: (id: string, date: number) => dispatch(declineTransactionAction(id, date)),
  increaseBalance: (amount: number) => dispatch(increaseBalance(amount)),
  decreaseBalance: (amount: number) => dispatch(decreaseBalance(amount)),
  deselectTransaction: () => dispatch(deselectTransaction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionDetailView)
