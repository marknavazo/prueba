import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LandingPage from '../../pages/Landing';
import HomePage from '../../pages/Home';
import ListPage from '../../pages/List';
import UserPage from '../../pages/User';
import NewUserPage from '../../pages/NewUser';
import ProfilePage from '../../pages/Profile';
import PolicyPage from '../../pages/Policy';
import My404Component from '../../pages/My404Component';
import Navigation from '../Navigation';
import Footer from '../Footer';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div id="app-in">
      <Navigation />
      <div className="general__container" id="general">
        <Switch>
          <Route
            exact
            path={ROUTES.LANDING}
            component={LandingPage}
          />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.LIST} component={ListPage} />
          <Route
            exact
            path={`${ROUTES.LIST}/:id`}
            component={UserPage}
          />
          <Route path={ROUTES.NEW_USER} component={NewUserPage} />
          <Route path={ROUTES.PROFILE} component={ProfilePage} />
          <Route path={ROUTES.POLICY} component={PolicyPage} />

          <Route component={My404Component} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
);

export default withAuthentication(App);
