export interface Balance {
    previousAmount: number | null,
    amount: number,
    animationProgress: number,
    updatedAt: number,
    displayAmount: number,
}

export const INCREASE_BALANCE = 'INCREASE_BALANCE'

interface IncreaseBalanceAction {
    type: typeof INCREASE_BALANCE
    payload: {
        amount: number
        amountBeforeIncrease: number,
        updatedAt: number,
    }
}

export const DECREASE_BALANCE = 'DECREASE_BALANCE'

interface DecreaseBalanceAction {
    type: typeof DECREASE_BALANCE
    payload: {
        amount: number,
        amountBeforeDecrease: number,
        updatedAt: number,
    }
}

export const SET_ANIMATION_PROGRESS = 'SET_ANIMATION_PROGRESS'

interface SetAnimationProgressAction {
    type: typeof SET_ANIMATION_PROGRESS
    payload: {
        animationProgress: number
    }
}

export const SET_DISPLAY_AMOUNT = 'SET_DISPLAY_AMOUNT'

interface SetDisplayAmountAction {
    type: typeof SET_DISPLAY_AMOUNT,
    payload: {
        displayAmount: number
    }
}

export type BalanceActionTypes =
    IncreaseBalanceAction |
    DecreaseBalanceAction |
    SetDisplayAmountAction |
    SetAnimationProgressAction