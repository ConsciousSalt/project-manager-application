import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './storage/reducers/auth';

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

//for development purpose - to display correctly in extention
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer
});

const appStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={appStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
