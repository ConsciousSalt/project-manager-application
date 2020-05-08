import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Layout from './containers/Layout/Layout';

import Navigation from './components/Navigation/Navigation';
import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import OrderList from './containers/Orders/OrderList/OrderList';

function App() {
  return (
    <Router>
      <Layout>
      <React.Fragment>
          <Navigation/>
          <Switch>
            <Route path="/orders">
              <OrderList/>
            </Route>
            <Route path="/auth">
              <Auth/>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
            <Route path="/" strict>
              <Main/>
            </Route>
          </Switch>
        </React.Fragment>
      </Layout>
    </Router>
  );
}

export default App;
