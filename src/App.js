import React, { Component } from 'react';
import { browserHistory, Route, Router } from 'react-router';
import Home from './components/Home';
import SearchBlock from "./components/SearchBlock";
import SearchTransaction from "./components/SearchTransaction";
import Statistic from "./components/Statistic";

class App extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={Home}>
          <Route path="searchBlock" component={SearchBlock}/>
          <Route path="searchTransaction" component={SearchTransaction}/>
          <Route path="statistic" component={Statistic}/>
        </Route>
      </Router>
    );
  }
}

export default App;
