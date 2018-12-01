import React, { Component } from 'react';
import { browserHistory, Route, Router } from 'react-router';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={Home}/>
        <Route path="/blocks" component={searchBlock}/>
      </Router>
    );
  }
}

export default App;
