import {
    state,
    INCREASE_BALANCE,
    DECREASE_BALANCE,
    BalanceActionTypes
} from './types'

export const initialState: state = {
    balance: 25
}

export function balance (
    state = initialState,
    action: BalanceActionTypes
): state {
    switch (action.type) {
        case INCREASE_BALANCE:
            return {
                balance: state.balance + action.payload
            }
        case DECREASE_BALANCE:
            return {
                balance: state.balance + action.payload
            }
        default:
            return state
    }
}