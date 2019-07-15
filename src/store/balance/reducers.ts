import {
  Balance,
  INCREASE_BALANCE,
  DECREASE_BALANCE,
  BalanceActionTypes,
  SET_ANIMATION_PROGRESS,
  SET_DISPLAY_AMOUNT
} from './types'

const initialState: Balance = {
  amount: 25,
  displayAmount: 25,
  previousAmount: null,
  animationProgress: 0,
  updatedAt: Date.now()
}

export default function balanceReducer(
  state = initialState,
  action: BalanceActionTypes
): Balance {
  switch (action.type) {
    case INCREASE_BALANCE: {
      const { amount, previousAmount, updatedAt, ...rest } = state
      return {
        amount: state.amount + action.payload.amount,
        previousAmount: action.payload.amountBeforeIncrease,
        updatedAt: action.payload.updatedAt,
        ...rest

      }
    }
    case DECREASE_BALANCE: {
      const { amount, previousAmount, updatedAt, ...rest } = state
      return {
        amount: state.amount - action.payload.amount,
        previousAmount: action.payload.amountBeforeDecrease,
        updatedAt: action.payload.updatedAt,
        ...rest
      }
    }
    case SET_ANIMATION_PROGRESS: {
      const { animationProgress, ...rest } = state
      const clampedAnimationProgress = Math.min(1, Math.max(0, action.payload.animationProgress))
      return {
        animationProgress: clampedAnimationProgress,
        ...rest
      }
    }
    case SET_DISPLAY_AMOUNT: {
      const { displayAmount, ...rest } = state
      return {
        displayAmount: action.payload.displayAmount,
        ...rest
      }
    }
    default:
      return state
  }
}