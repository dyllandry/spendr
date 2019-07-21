import { connect } from 'react-redux'
import TransactionList from './TransactionList'
import { AppState } from '../store'
import {
  TransactionsState,
} from '../store/transaction/types'
import { TFilter } from "../store/tFilter/types";
import { Dispatch } from 'redux';
import {
  selectTransaction,
  deselectTransaction
} from "../store/detailedTransaction/actions";

const mapStateToProps = (state: AppState) => ({
  transactions: getVisibleTransactions(state.transactions, state.tFilter),
  detailedTransaction: state.detailedTransaction
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  focusTransaction: (id: string, transactionElementId: string) => {
    dispatch(selectTransaction(id, transactionElementId))
  },
  unfocusTransaction: () => {
    dispatch(deselectTransaction())
  }
})

function getVisibleTransactions(transactions: TransactionsState, filter: TFilter) {
  const visibleTransactions: TransactionsState = {}
  for (const tId in transactions) {
    const t = transactions[tId]
    let allowed = true
    for (const mask of filter) {
      if (t.status !== mask && t.type !== mask) {
        allowed = false
      }
    }
    if (allowed) visibleTransactions[tId] = t
  }
  return visibleTransactions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionList)
