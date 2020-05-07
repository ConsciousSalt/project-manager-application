import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';

import * as authActions from './containers/Auth/AuthData/actions';
import authData from './containers/Auth/AuthData/reducers';

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

const store = createStore(authData, window.STATE_FROM_SERVER);

console.log(store.getState());

const unsubscribe = store.subscribe(()=>console.log(store.getState()));

//Dispatch some actions
store.dispatch(authActions.enterDataBegin());
store.dispatch(authActions.enteringData(authActions.enteringDataStages.EMAIL,"somemail@mail.ru"));
store.dispatch(authActions.enterDataEnd(authActions.enteringDataStages.EMAIL,{error:false, errorMessage: ""}));

store.dispatch(authActions.enterDataBegin());
store.dispatch(authActions.enteringData(authActions.enteringDataStages.PASSWORD, "qwerty"));
store.dispatch(authActions.enterDataEnd(authActions.enteringDataStages.PASSWORD, {error: true, errorMessage: "Password invalid"}))

unsubscribe();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
