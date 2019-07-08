import React from 'react'
import { TransactionsState } from '../store/transaction/types';
import Transaction from './Transaction'
import TFilter from './TFilter';

function TransactionList({
  transactions = {}
}: {
  transactions: TransactionsState
}) {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        <TFilter />
        {Object.entries(transactions).map(([id, t]) =>
          <Transaction
            key={id}
            id={id}
            type={t.type}
            amount={t.amount}
            origin={t.origin}
            status={t.status}
          />
        )}
      </ul>
    </div>
  )
}

export default TransactionList
