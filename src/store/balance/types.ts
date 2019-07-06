export type Balance = number

export const INCREASE_BALANCE = 'INCREASE_BALANCE'

interface IncreaseBalanceAction {
    type: typeof INCREASE_BALANCE
    payload: Balance
}

export const DECREASE_BALANCE = 'DECREASE_BALANCE'

interface DecreaseBalanceAction {
    type: typeof DECREASE_BALANCE
    payload: Balance
}

export type BalanceActionTypes = IncreaseBalanceAction | DecreaseBalanceAction