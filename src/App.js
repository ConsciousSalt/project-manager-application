import {useEffect} from 'react';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'

import {connect} from 'react-redux';
import * as actions from './storage/actions/auth';

import Layout from './containers/Layout/Layout';

import TopBar from './components/TopBar/TopBar';
import Main from './containers/Main/Main';
import Logout from './containers/Auth/Logout';
import OrderList from './containers/Orders/OrderList/OrderList';

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup()
  },[]);

  let authRoutes = null;
  if (props.isAuthenticated){
    authRoutes = (
      <React.Fragment>
        <Route path="/orders">
          <OrderList/>        
        </Route>
        <Route path="/logout">
          <Logout/>        
        </Route>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline/>
      <Router>
        <Paper>
          <Typography variant='caption' display='block' align='center' gutterBottom>Project Manager Application</Typography>     
            <TopBar/>
            <Switch>
              {authRoutes}
              <Route path="/" strict>
                <Main isAuthenticated={props.isAuthenticated}/>
              </Route>
            </Switch>
        </Paper> 
      </Router>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: ()=>{dispatch(actions.authCheckState())} 
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
