import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/'
import { Balance as BalanceType } from '../store/balance/types'
import styles from "./Balance.module.css";

function Balance({
  balance = 0
}: {
  balance: BalanceType
}) {
  return (
    <div className={styles.balance}>
      <div className={styles.balanceAmount}>
        ${balance.toFixed(2)}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  balance: state.balance
})

export default connect(mapStateToProps)(Balance)