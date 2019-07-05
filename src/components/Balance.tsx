import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { state } from '../store/types'

interface props {
    balance: number
}

function Balance (props: props) {
    return <div>Balance: {props.balance} </div>
}

const mapStateToProps = (state: state) => ({
    balance: state.balance
})

export default connect(mapStateToProps)(Balance)