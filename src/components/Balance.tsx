import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { AppState } from '../store/'
import { Balance as BalanceType } from '../store/balance/types'

function Balance({
    balance = 0
}: {
    balance: BalanceType
}) {
    return <div>Balance: ${balance}</div>
}

const mapStateToProps = (state: AppState) => ({
    balance: state.balance
})

export default connect(mapStateToProps)(Balance)