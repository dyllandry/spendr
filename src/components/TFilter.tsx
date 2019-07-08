import React from 'react'
import { Dispatch } from "redux";
import { connect } from 'react-redux'
import { TStatus } from "../store/transaction/types";
import { TFilter as TFilterType } from "../store/tFilter/types";
import { AppState } from '../store';
import { setTFilter } from "../store/tFilter/actions";

function TFilter({
  selected,
  select
}: {
  selected: TFilterType,
  select: (status: TFilterType) => void,
}) {
  return (
    < div >
      <button
        onClick={() => select([TStatus.Pending])}
        style={{
          backgroundColor: selected.includes(TStatus.Pending) ? '#7edaff' : 'white'
        }}
      >
        Pending
      </button>
      <button
        onClick={() => select([TStatus.Approved])}
        style={{
          backgroundColor: selected.includes(TStatus.Approved) ? '#7edaff' : 'white'
        }}
      >
        Approved
      </button>
    </div >
  )
}

const mapStateToProps = (state: AppState) => ({
  selected: state.tFilter
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  select: (status: TFilterType) => dispatch(setTFilter(status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TFilter)
