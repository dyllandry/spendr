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
import { increaseBalance } from './store/balance/actions'
import { createTransaction } from './store/transaction/actions'
import logger from 'redux-logger'


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

store.dispatch(increaseBalance(5))
store.dispatch(createTransaction({
    type: 'demand',
    amount: 100
}))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
