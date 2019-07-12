import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styles from './TransactionDetail.module.css'
import { DetailedTransaction } from "../store/detailedTransaction/types";
import { AppState } from '../store';
import { Transaction, TStatus, TType } from '../store/transaction/types';
import FormattedDate from './FormattedDate';
import { Dispatch } from 'redux';
import { approveTransaction, declineTransaction } from '../store/transaction/actions';
import { increaseBalance, decreaseBalance } from '../store/balance/actions';

const TransactionDetailView = ({
  id,
  transaction: t,
  approveTransaction,
  declineTransaction,
  increaseBalance,
  decreaseBalance,
}: {
  id: DetailedTransaction,
  transaction: Transaction | null,
  approveTransaction: (id: string) => void,
  declineTransaction: (id: string) => void,
  increaseBalance: (amount: number) => void,
  decreaseBalance: (amount: number) => void
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
              {t.subject}
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
                          ? () => declineTransaction(id)
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
                              increaseBalance(t.amount)
                            } else if (t.type === TType.Withdrawal) {
                              decreaseBalance(t.amount)
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
  id: state.detailedTransaction,
  transaction: state.detailedTransaction !== null
    ? state.transactions[state.detailedTransaction]
    : null
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  approveTransaction: (id: string) => dispatch(approveTransaction(id)),
  declineTransaction: (id: string) => dispatch(declineTransaction(id)),
  increaseBalance: (amount: number) => dispatch(increaseBalance(amount)),
  decreaseBalance: (amount: number) => dispatch(decreaseBalance(amount))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionDetailView)