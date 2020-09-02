import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IndexPage from './IndexPage/IndexPage';
import ServerPage from './ServerPage/ServerPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/:key" component={ServerPage} />
    </Switch>
  );
}

export default App;
