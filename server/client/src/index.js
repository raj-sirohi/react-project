import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

// import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import './semantic/dist/semantic.min.css';
import './index.css';
import App from './components/App';
import reducers from './store/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,{}, composeEnhancers(
    applyMiddleware(reduxThunk)
));

ReactDOM.render(
    <Provider store={store}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
