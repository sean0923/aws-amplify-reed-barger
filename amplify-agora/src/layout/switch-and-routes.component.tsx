import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from '../components/navbar.component';

import HomePage from '../pages/home.page.component';
import ProfilePage from '../pages/profile.page.component';
import MarketsPage from '../pages/markets.page.component';

const SwitchAndRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/markets/:marketId" component={MarketsPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default SwitchAndRoutes;
