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
    origin: 'Bob Whitaker',
    amount: 5,
    subject: 'Thanks for the skittles, I will never forget it.',
    date: new Date(2019, 6, 9, 23, 59).getTime()
}))

const date = new Date(Date.now())

store.dispatch(createTransaction({
    origin: 'Bob Whitaker',
    amount: 5.50,
    type: TType.Withdrawal,
    subject: 'Sorry, wrong person.',
    date: date.setMinutes(date.getMinutes() - 4)
}))

store.dispatch(createTransaction({
    origin: 'Bob Whitaker',
    amount: 0.50,
    type: TType.Deposit,
    subject: 'RE: Skittles'
}))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
