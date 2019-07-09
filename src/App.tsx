import React from 'react';
import Balance from './components/Balance';
import VisibleTransactionList from './components/VisibleTransactionList';
import Header from './components/Header';
import { BrowserRouter as Router } from "react-router-dom";
import * as OutlineManager from './outline-manager'

OutlineManager.start()

class App extends React.Component {
  render() {
    return (
      <div className="App">
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
