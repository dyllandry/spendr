import {
  SET_T_FILTER,
  SetTFilterAction,
  TFilter
} from "./types";

export function setTFilter(
  status: TFilter
): SetTFilterAction {
  return {
    type: SET_T_FILTER,
    payload: status
  }
}