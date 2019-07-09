import React from 'react'
import { Dispatch } from "redux";
import { connect } from 'react-redux'
import { TStatus } from "../store/transaction/types";
import { TFilter as TFilterType } from "../store/tFilter/types";
import { AppState } from '../store';
import { setTFilter } from "../store/tFilter/actions";
import styles from "./TFilter.module.css"
const classNames = require('classnames')

function TFilter({
  selected,
  select
}: {
  selected: TFilterType,
  select: (status: TFilterType) => void,
}) {
  return (
    <div className={styles.container}>
      Filter by
      <button
        onClick={() => select([TStatus.Pending])}
        aria-label='Filter transactions by pending.'
        title='Filter transactions by pending.'
        aria-controls='transactions-list'
        className={classNames(
          styles.option,
          { [styles.selected]: selected.includes(TStatus.Pending) }
        )}
      >
        <span className={styles.optionText}>
          Pending
        </span>
        <div className={styles.optionUnderline}></div>
      </button>
      <button
        onClick={() => select([TStatus.Approved])}
        aria-label='Filter transactions by approved.'
        title='Filter transactions by approved.'
        aria-controls='transactions-list'
        className={classNames(
          styles.option,
          { [styles.selected]: selected.includes(TStatus.Approved) }
        )}
      >
        <span className={styles.optionText}>
          Approved
        </span>
        <div className={styles.optionUnderline}></div>
      </button>
    </div>
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
