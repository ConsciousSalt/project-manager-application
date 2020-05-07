import React from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';

import Layout from './containers/Layout/Layout';

import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';
import OrderList from './containers/Orders/OrderList/OrderList';

function App() {
  return (
    <Router>
      <Layout>
      <React.Fragment>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/auth">
                            Log in
                        </Link>
                    </li>
                </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/orders">
              <OrderList/>
            </Route>
            <Route path="/auth">
              <Auth/>
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
