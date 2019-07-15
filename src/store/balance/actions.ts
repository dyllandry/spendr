import {
  INCREASE_BALANCE,
  DECREASE_BALANCE,
  BalanceActionTypes,
  SET_ANIMATION_PROGRESS,
  SET_DISPLAY_AMOUNT
} from './types'

export function increaseBalance(
  amount: number,
  amountBeforeIncrease: number,
  updatedAt: number
): BalanceActionTypes {
  return {
    type: INCREASE_BALANCE,
    payload: {
      amount,
      amountBeforeIncrease,
      updatedAt
    }
  }
}

export function decreaseBalance(
  amount: number,
  amountBeforeDecrease: number,
  updatedAt: number
): BalanceActionTypes {
  return {
    type: DECREASE_BALANCE,
    payload: {
      amount,
      amountBeforeDecrease,
      updatedAt
    }
  }
}

export function setAnimationProgress(
  animationProgress: number
): BalanceActionTypes {
  return {
    type: SET_ANIMATION_PROGRESS,
    payload: {
      animationProgress
    }
  }
}

export function setDisplayAmount(
  displayAmount: number
): BalanceActionTypes {
  return {
    type: SET_DISPLAY_AMOUNT,
    payload: {
      displayAmount
    }
  }
}