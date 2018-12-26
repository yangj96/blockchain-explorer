import React, { Component } from 'react';
import { browserHistory, Route, Router, IndexRoute } from 'react-router';
import Home from './components/Home';
import ListBlockTx from "./components/ListBlockTx";
import SearchBlockTx from "./components/SearchBlockTx";
import ListAllBlocks from "./components/listAllBlocks";
import Statistic from "./components/Statistic";


class App extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={Home}>
          <IndexRoute component={ListBlockTx}/>
          <Route path="listBlockTx" component={ListBlockTx}/>
          <Route path="listAllBlocks" component={ListAllBlocks}/>
          <Route path="searchBlockTx" component={SearchBlockTx}/>
          <Route path="statistic" component={Statistic}/>
        </Route>
      </Router>
    );
  }
}

export default App;
