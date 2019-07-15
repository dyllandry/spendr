import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { AppState } from '../store/'
import { Balance as BalanceType } from '../store/balance/types'
import styles from "./Balance.module.css";
import { Dispatch } from 'redux';
import {
  setAnimationProgress as setAnimationProgressAction,
  setDisplayAmount as setDisplayAmountAction
} from "../store/balance/actions";

function Balance({
  balance,
  setAnimationProgress,
  setDisplayAmount
}: {
  balance: BalanceType,
  setAnimationProgress: typeof setAnimationProgressAction,
  setDisplayAmount: typeof setDisplayAmountAction
}) {
  if (balance.animationProgress < 1 && balance.previousAmount !== null) {
    const timeSinceUpdate = Date.now() - balance.updatedAt
    const updatedAnimationProgress = Math.min(1, balance.animationProgress + timeSinceUpdate / 1000)

    const amountDifference = balance.amount - balance.previousAmount
    const updatedDisplayAmount = balance.previousAmount + (updatedAnimationProgress * amountDifference)

    window.setTimeout(() => {
      setAnimationProgress(updatedAnimationProgress)
      setDisplayAmount(updatedDisplayAmount)
    }, 0)
  }

  if (balance.animationProgress > 1) {
    setAnimationProgress(1)
  }
  return (
    <div className={styles.balance}>
      <div className={styles.balanceAmount}>
        ${balance.displayAmount.toFixed(2)}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  balance: state.balance
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAnimationProgress: (
    progress: number
  ) => dispatch(setAnimationProgressAction(progress)),
  setDisplayAmount: (
    amount: number
  ) => dispatch(setDisplayAmountAction(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(Balance)