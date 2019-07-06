import React from 'react';
import './App.css';
import BalanceType from './components/Balance';
import VisibleTransactionList from './components/VisibleTransactionList';

class App extends React.Component  {
  render() {
    return (
      <div className="App">
        <h1>Spendr</h1>
        <BalanceType />
        <VisibleTransactionList />
      </div>
    )  
  }
}

export default App;
