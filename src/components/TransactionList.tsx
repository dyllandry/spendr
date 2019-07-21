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
      <div 
        className={styles.twoColumnView}
        role='region'
        aria-label='transactions list'
      >
        <ol
          id='transactions-list'
          aria-live='polite'
          className={styles.list}
        >
          {tArray.length === 0 &&
            <li className={styles.noTransactions}>No transactions found.</li>
          }
          {tArray.map((t, index) => {
            const transactionElementId = `transaction ${index + 1}`
            return (
                <li
                  className={styles.transactionListItem}
                >
                  <button
                    key={t.id}
                    className={styles.transactionButton}
                    aria-haspopup='true'
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
                </li>
            )
          }
          )}
        </ol>
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
