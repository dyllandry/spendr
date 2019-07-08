import {
  SET_T_FILTER,
  SetTFilterAction,
  TFilter
} from "./types";
import { TStatus } from "../transaction/types";

const initialState: TFilter = [TStatus.Pending]

export default function (
  state = initialState,
  action: SetTFilterAction
): TFilter {
  switch (action.type) {
    case SET_T_FILTER:
      return action.payload
    default:
      return state
  }
}