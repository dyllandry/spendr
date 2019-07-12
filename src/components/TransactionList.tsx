import React from 'react'
import styles from './TransactionList.module.css'
import { TransactionsState } from '../store/transaction/types';
import Transaction from './Transaction'
import TransactionDetailView from './TransactionDetail';
import TFilter from './TFilter';
import Media from 'react-media'

function TransactionList({
  transactions = {},
  focusTransaction,
  unfocusTransaction
}: {
  transactions: TransactionsState,
  focusTransaction: (id: string) => void,
  unfocusTransaction: () => void
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
              status={t.status}
              date={t.date}
              subject={t.subject}
              onClick={() => { focusTransaction(id) }}
            />
          )}
        </ul>
        <Media query='(min-width: 900px)'>
          <TransactionDetailView />
        </Media>
      </div>
    </div>
  )
}

export default TransactionList
