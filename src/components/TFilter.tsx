import React from 'react'
import { Dispatch } from "redux";
import { connect } from 'react-redux'
import { TStatus, Transaction } from "../store/transaction/types";
import { TFilter as TFilterType } from "../store/tFilter/types";
import { AppState } from '../store';
import { setTFilter } from "../store/tFilter/actions";
import styles from "./TFilter.module.css"
import Media from 'react-media';
import { unfocusTransaction } from '../store/detailedTransaction/actions';
const classNames = require('classnames')

function TFilter({
  selected,
  select,
  transactionsPending,
  unfocusTransaction
}: {
  selected: TFilterType,
  select: (status: TFilterType) => void,
  transactionsPending: number,
  unfocusTransaction: () => void
}) {
  return (
    <div 
      className={styles.container}
      role='region'
      aria-label='transaction filters'
    >
      <Media query='(min-width: 385px)'>
        <span 
          className={styles.filtersLabel}
          aria-hidden='true'
        >
          Filter by
        </span>
      </Media>
      <button
        onClick={() => {
          select([TStatus.Pending])
          unfocusTransaction()
        }}
        aria-label='Filter transactions by pending.'
        title='Filter transactions by pending.'
        aria-controls='transactions-list'
        className={classNames(
          styles.option,
          { [styles.selected]: selected.includes(TStatus.Pending) }
        )}
      >
        <span className={styles.optionText}>
          Pending ({transactionsPending})
        </span>
      </button>
      <button
        onClick={() => {
          select([TStatus.Approved])
          unfocusTransaction()
        }}
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
      </button>
      <button
        onClick={() => {
          select([TStatus.Declined])
          unfocusTransaction()
        }}
        aria-label='Filter transactions by declined.'
        title='Filter transactions by declined.'
        aria-controls='transactions-list'
        className={classNames(
          styles.option,
          { [styles.selected]: selected.includes(TStatus.Declined) }
        )}
      >
        Declined
      </button>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  selected: state.tFilter,
  transactionsPending: Object.values(state.transactions).reduce((total: number, t: Transaction) => {
    if (t.status === TStatus.Pending) return total + 1
    else return total
  }, 0)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  select: (status: TFilterType) => dispatch(setTFilter(status)),
  unfocusTransaction: () => dispatch(unfocusTransaction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TFilter)
