import React from 'react'
import { Transaction } from '../store/transaction/types';

function TransactionList({
    transactions = []
} : {
    transactions: Transaction[]
} ) {
    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                { transactions.map(t => 
                  <li key={t.id}>{t.type}: {t.amount}</li>
                )}
            </ul>
        </div>
    )
}

export default TransactionList
