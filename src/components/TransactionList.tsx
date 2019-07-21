import React from 'react'
import styles from './TransactionList.module.css'
import { TransactionsState } from '../store/transaction/types';
import Transaction from './Transaction'
import TransactionDetailView from './TransactionDetail';
import TFilter from './TFilter';
import { DetailedTransaction } from '../store/detailedTransaction/types';

function TransactionList({
  transactions = {},
  focusTransaction,
  unfocusTransaction,
  detailedTransaction
}: {
  transactions: TransactionsState,
  focusTransaction: (id: string, transactionElementId: string) => void,
  unfocusTransaction: () => void,
  detailedTransaction: DetailedTransaction
}) {
  const tArray = Object.entries(transactions).map(([id, t]) => ({
    id,
    ...t,
  }))
  tArray.sort((t1, t2) => t1.date - t2.date)
  return (
    <div className={styles.container}>
      <h2 className={styles.transactionsHeader}>
        Transactions
      </h2>
      <TFilter />
      <div className={styles.twoColumnView}>
        <div
          id='transactions-list'
          aria-live='polite'
          className={styles.list}
          aria-label='Transactions'
        >
          {tArray.length === 0 &&
            <div className={styles.noTransactions}>No transactions found.</div>
          }
          {tArray.map((t, index) => {
            const transactionElementId = `transaction ${index + 1}`
            return (
              <button
                key={t.id}
                className={styles.transactionContainer}
                aria-selected={t.id === detailedTransaction.id}
                tabIndex={-1}
                id={transactionElementId}
                    onClick={() => { focusTransaction(t.id, transactionElementId) }}
              >
                <Transaction
                  id={t.id}
                  type={t.type}
                  amount={t.amount}
                  origin={t.origin}
                  date={t.date}
                  subject={t.subject}
                />
              </button>
            )
          }
          )}
        </div>
        <div className={
          detailedTransaction.id === null
            ? styles.tDVContainer
            : styles.tDVContainerVisible
        }>
          <TransactionDetailView
            callback={() => unfocusTransaction()}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionList
