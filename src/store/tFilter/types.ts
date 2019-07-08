import { TStatus, TType } from "../transaction/types";

export type TFilter = (TType | TStatus)[]

export const SET_T_FILTER = 'SET_T_FILTER'

export interface SetTFilterAction {
  type: typeof SET_T_FILTER,
  payload: TFilter
}