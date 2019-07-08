import {
    Balance,
    INCREASE_BALANCE,
    DECREASE_BALANCE,
    BalanceActionTypes
} from './types'

const initialState: Balance = 25

export default function balanceReducer(
    state = initialState,
    action: BalanceActionTypes
): Balance {
    switch (action.type) {
        case INCREASE_BALANCE:
            return state + action.payload
        case DECREASE_BALANCE:
            return state - action.payload
        default:
            return state
    }
}