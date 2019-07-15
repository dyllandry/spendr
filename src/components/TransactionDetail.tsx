import React, { Fragment } from 'react'
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
import {
  increaseBalance as increaseBalanceAction,
  decreaseBalance as decreaseBalanceAction,
  setAnimationProgress
} from '../store/balance/actions';
import { unfocusTransaction } from '../store/detailedTransaction/actions';

const TransactionDetailView = ({
  balanceAmount,
  id,
  transaction: t,
  approveTransaction,
  declineTransaction,
  increaseBalance,
  decreaseBalance,
  callback,
  unfocusTransaction,
  resetAnimationProgress
}: {
  balanceAmount: number
  id: DetailedTransaction,
  transaction: Transaction | null,
  approveTransaction: typeof approveTransactionAction,
  declineTransaction: typeof declineTransactionAction,
  increaseBalance: typeof increaseBalanceAction,
  decreaseBalance: typeof decreaseBalanceAction
  callback?: () => void,
  unfocusTransaction: () => void,
  resetAnimationProgress: () => void
}) => {
  return (
    <div className={styles.default}>
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
                t.message ||
                <div className={styles.noMessage}>
                  No attached message.
                </div>
              }
            </div>
            <div className={styles.amountContainer}>
              <div className={styles.amount}>
                ${t.amount.toFixed(2)}
              </div>
              <div>
                {t.status === TStatus.Pending &&
                  <React.Fragment>
                    <button
                      className={styles.decline}
                      onClick={
                        id !== null
                          ? () => {
                            declineTransaction(id)
                            if (callback) callback()
                          }
                          : undefined
                      }
                    >
                      Decline
                    </button>
                    <button
                      className={styles.approve}
                      onClick={
                        id !== null
                          ? () => {
                            approveTransaction(id)
                            if (t.type === TType.Deposit) {
                              increaseBalance(t.amount, balanceAmount, Date.now())
                            } else if (t.type === TType.Withdrawal) {
                              decreaseBalance(t.amount, balanceAmount, Date.now())
                            }
                            resetAnimationProgress()
                            if (callback) callback()
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
  balanceAmount: state.balance.amount,
  id: state.detailedTransaction,
  transaction: state.detailedTransaction !== null
    ? state.transactions[state.detailedTransaction]
    : null
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  approveTransaction: (id: string) => dispatch(approveTransactionAction(id)),
  declineTransaction: (id: string) => dispatch(declineTransactionAction(id)),
  increaseBalance: (
    amount: number,
    amountBeforeIncrease: number,
    updatedAt: number
  ) => dispatch(increaseBalanceAction(amount, amountBeforeIncrease, updatedAt)),
  decreaseBalance: (
    amount: number,
    amountBeforeDecrease: number,
    updatedAt: number
  ) => dispatch(decreaseBalanceAction(amount, amountBeforeDecrease, updatedAt)),
  unfocusTransaction: () => dispatch(unfocusTransaction()),
  resetAnimationProgress: () => dispatch(setAnimationProgress(0))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionDetailView)