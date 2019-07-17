import React from 'react';
import Balance from './components/Balance';
import VisibleTransactionList from './components/VisibleTransactionList';
import Header from './components/Header';
import { BrowserRouter as Router } from "react-router-dom";
import * as OutlineManager from './scripts/outline-manager'
import styles from './App.module.css'

OutlineManager.start()

class App extends React.Component {
  render() {
    return (
      <div className={styles.default}>
        <Router basename={process.env.REACT_APP_BASENAME}>
          <Header />
        </Router>
        <Balance />
        <VisibleTransactionList />
      </div>
    )
  }
}

export default App;
