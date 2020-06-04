import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import SearchPoint from './pages/SearchPoint';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/create-point" exact component={CreatePoint}/>
      <Route path="/search-point" exact component={SearchPoint}/>
    </BrowserRouter>
  );
}

export default Routes;