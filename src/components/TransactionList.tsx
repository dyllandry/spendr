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
          {Object.entries(transactions).map(([id, t]) =>
            <Transaction
              key={id}
              id={id}
              type={t.type}
              amount={t.amount}
              origin={t.origin}
              date={t.date}
              subject={t.subject}
              onClick={() => { focusTransaction(id) }}
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
