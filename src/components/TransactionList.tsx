import React, { useRef } from 'react'
import styles from './TransactionList.module.css'
import { TransactionsState } from '../store/transaction/types';
import Transaction from './Transaction'
import TransactionDetailView from './TransactionDetail';
import TFilter from './TFilter';
import { DetailedTransaction } from '../store/detailedTransaction/types';

let keydownEventListener: any = null

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

  const tListRef = useRef<HTMLOListElement>(null)
  // I do not think these keyboard interactions are even required of aria w3 spec.
  // It's just a list with popups, it isn't a menu.
  if (tListRef.current !== null && keydownEventListener === null) {
    // cache event listener
    keydownEventListener = tListRef.current.addEventListener('keydown', (event: KeyboardEvent) => {
      // Would imply the transaction list doesn't exist
      if (tListRef.current === null) return
      // Listener implies a child must be focused
      if (document.activeElement === null) return

      const activeElement = document.activeElement as HTMLElement
      const childButtons = tListRef.current.querySelectorAll<HTMLElement>(`button.${styles.transactionButton}`)      
      const focusedButtonIndex = Array.from(childButtons).indexOf(activeElement)
      switch (event.key) {
        case 'ArrowDown':
        case 'Down':
          childButtons[(focusedButtonIndex + 1) % childButtons.length].focus()
          break
        case 'ArrowUp':
        case 'Up':
            childButtons[focusedButtonIndex === 0
              ? childButtons.length - 1
              : focusedButtonIndex - 1
            ].focus()
          break
      }
   })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.transactionsHeader}>
        Transactions
      </h2>
      <TFilter />
      <div className={styles.twoColumnView}>
        <ol
          id='transactions-list'
          className={styles.list}
          role='region'
          aria-label='transactions list'
          ref={tListRef}
        >
          {tArray.length === 0 &&
            <li className={styles.noTransactions}>No transactions found.</li>
          }
          {tArray.map((t, index) => {
            const transactionElementId = `transaction ${index + 1}`
            return (
              <li
                  key={t.id}
                  className={styles.transactionListItem}
                >
                  <button
                    className={styles.transactionButton}
                    aria-haspopup='true'
                    id={t.id}
                    onClick={() => { 
                      focusTransaction(t.id, transactionElementId) 
                      const tDetail = document.querySelector<HTMLElement>('#transaction--dialog-description')
                      if (tDetail) tDetail.focus()
                    }}
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
