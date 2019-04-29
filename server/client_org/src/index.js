//import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import  './index.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './store/reducers';

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const store = createStore(reducers,{}, composeEnhancers(
    applyMiddleware(reduxThunk)
));


ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
