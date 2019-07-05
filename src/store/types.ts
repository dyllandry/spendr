export interface state {
    balance: number
}

export const INCREASE_BALANCE = 'INCREASE_BALANCE'

interface IncreaseBalanceAction {
    type: typeof INCREASE_BALANCE
    payload: number
}

export const DECREASE_BALANCE = 'DECREASE_BALANCE'

interface DecreaseBalanceAction {
    type: typeof DECREASE_BALANCE
    payload: number
}

export type BalanceActionTypes = IncreaseBalanceAction | DecreaseBalanceAction