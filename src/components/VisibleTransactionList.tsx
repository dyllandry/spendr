import { connect } from 'react-redux'
import TransactionList from './TransactionList'
import { AppState } from '../store'

const mapStateToProps = ( state: AppState ) => ({
    transactions: state.transactions
})

export default connect(mapStateToProps)(TransactionList)