import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IndexPage from './IndexPage/IndexPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
    </Switch>
  );
}

export default App;
