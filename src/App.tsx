import React from 'react';
import './App.css';
import Balance from './components/Balance';

class App extends React.Component  {
  render() {
    return (
      <div className="App">
        <h1>Spendr</h1>
        <Balance />
      </div>
    )  
  }
}

export default App;
