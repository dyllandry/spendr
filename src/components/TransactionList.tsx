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
  focusTransaction: (id: string) => void,
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
        <ul
          id='transactions-list'
          aria-live='polite'
          className={styles.list}
        >
          {tArray.length === 0 &&
            <div className={styles.noTransactions}>No transactions found.</div>
          }
          {tArray.map(t =>
            <Transaction
              key={t.id}
              id={t.id}
              type={t.type}
              amount={t.amount}
              origin={t.origin}
              date={t.date}
              subject={t.subject}
              onClick={() => { focusTransaction(t.id) }}
            />
          )}
        </ul>
        <div className={
          detailedTransaction === null
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
