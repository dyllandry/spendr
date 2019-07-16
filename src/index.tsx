import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    createStore,
    applyMiddleware
} from 'redux'
import { rootReducer } from './store/'
import { Provider } from 'react-redux'
import { createTransaction } from './store/transaction/actions'
import logger from 'redux-logger'
import { TType } from './store/transaction/types';


const store = createStore(
    rootReducer,
    applyMiddleware(logger)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

store.dispatch(createTransaction({
    origin: 'Jonas Whitaker',
    amount: 5,
    subject: 'Thanks for the pizza last night.',
    message: 'We should get together again some time, I did not know you played FIFA, too. It was too much fun. Let me know!',
    date: new Date(2019, 6, 9, 23, 59).getTime()
}))

const date = new Date(Date.now())
const twoDaysLater = new Date(Date.now())
twoDaysLater.setDate(twoDaysLater.getDate() + 2)
const twoDaysLaterFormatted = `${twoDaysLater.getDate()}/${twoDaysLater.getMonth() + 1}/${twoDaysLater.getFullYear()}`

store.dispatch(createTransaction({
    origin: 'Spotify Inc.',
    amount: 11.50,
    type: TType.Withdrawal,
    subject: 'Premium Subscription',
    date: date.setMinutes(date.getMinutes() - 4),
    message: `Approve your Spotify Premium subscription transaction by ${twoDaysLaterFormatted} to receive uninterrupted service.`,
}))

const weeklyPay = 650
const savingsDeduction = weeklyPay * 0.05
const taxWithholdings = weeklyPay * 0.15
const totalReceivedPay = weeklyPay - savingsDeduction - taxWithholdings

store.dispatch(createTransaction({
    origin: 'Barry\'s Bagels',
    amount: totalReceivedPay,
    type: TType.Deposit,
    subject: 'Paycheck',
    date: new Date(2019, 6, 9, 23, 59).getTime(),
    message: `Weekly pay: $${weeklyPay}. Deposit into high interest savings: $${savingsDeduction.toFixed(2)}. Tax withholdings: $${taxWithholdings.toFixed(2)}. Total received pay: $${totalReceivedPay.toFixed(2)}.`
}))

const phoneCasePrice = 24.99
const phoneCaseTax = phoneCasePrice * 0.13
const totalPhoneCasePrice = phoneCasePrice + phoneCaseTax

store.dispatch(createTransaction({
    origin: 'Amazon',
    amount: totalPhoneCasePrice,
    type: TType.Withdrawal,
    subject: 'Order: AbIek3I903-a',
    message: `1 SafeTech Pixel 2 Phonecase: $${phoneCasePrice.toFixed(2)} + $${phoneCaseTax.toFixed(2)} = $${totalPhoneCasePrice.toFixed(2)}. Approve the transaction to begin order processing as soon as the next business day.`
}))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
