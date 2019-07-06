import {
    INCREASE_BALANCE,
    DECREASE_BALANCE,
    BalanceActionTypes
} from './types'

export function increaseBalance (amount: number): BalanceActionTypes {
    return {
        type: INCREASE_BALANCE,
        payload: amount
    }
}

export function decreaseBalance (amount: number): BalanceActionTypes {
    return {
        type: DECREASE_BALANCE,
        payload: amount
    }
}