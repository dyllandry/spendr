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
import { unfocusTransaction } from '../store/detailedTransaction/actions';
const ReactMarkdown = require('react-markdown')

const TransactionDetailView = ({
  detailedTransaction,
  transaction: t,
  approveTransaction,
  declineTransaction,
  increaseBalance,
  decreaseBalance,
  callback,
  unfocusTransaction
}: {
  detailedTransaction: DetailedTransaction,
  transaction: Transaction | null,
  approveTransaction: typeof approveTransactionAction,
  declineTransaction: typeof declineTransactionAction,
  increaseBalance: (amount: number) => void,
  decreaseBalance: (amount: number) => void
  callback?: () => void,
  unfocusTransaction: () => void
}) => {
  const transactionDetailRef = useRef<HTMLDivElement>(null)
  if (transactionDetailRef.current !== null) {
    transactionDetailRef.current.scrollTop = 0
  }
  const statusModifiedToday = t &&
    new Date(t.statusModifiedAt).getDate() === new Date(Date.now()).getDate()
  return (
    <div
      className={styles.default}
      ref={transactionDetailRef}
      aria-live='polite'
      aria-label='transaction details'
      role='region'
    >
      {t === null ? (
        <div>
          Select a transaction to view details.
        </div>
      ) : (
          <Fragment>
            <div className={styles.subject}>
              <button
                onClick={() => unfocusTransaction()}
                className={styles.closeButton}
                aria-label='Close transaction detail.'
              >
                X
              </button>
              <span>
                {t.subject}
              </span>
            </div>
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
                {
                  t.type === TType.Deposit
                    ? '+'
                    : '-'
                }
                ${t.amount.toFixed(2)}
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
                              declineTransaction(detailedTransaction.id, Date.now())
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
                              approveTransaction(detailedTransaction.id, Date.now())
                              if (t.type === TType.Deposit) {
                                increaseBalance(t.amount)
                              } else if (t.type === TType.Withdrawal) {
                                decreaseBalance(t.amount)
                              }
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
    </div>
  )
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
  unfocusTransaction: () => dispatch(unfocusTransaction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionDetailView)
