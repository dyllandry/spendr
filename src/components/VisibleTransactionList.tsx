import { connect } from 'react-redux'
import TransactionList from './TransactionList'
import { AppState } from '../store'
import {
    TStatus,
    TransactionsState,
    Transaction
} from '../store/transaction/types'

const mapStateToProps = (state: AppState) => ({
    transactions: getVisibleTransactions(state.transactions)
})

function getVisibleTransactions(transactions: TransactionsState) {
    const visibleTransactions: { [index: string]: Transaction } = {}
    for (let tId in transactions) {
        if (transactions[tId].status === TStatus.Pending) {
            visibleTransactions[tId] = transactions[tId]
        }
    }
    return visibleTransactions
}

export default connect(mapStateToProps)(TransactionList)