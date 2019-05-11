import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import globalErrorHandler from '../hoc/errorHandler/globalErrorHandler'
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import VerticalMenu from './VerticalMenu/VerticalMenu'
import Message from './Message/Message';
import Gallery from './Gallery/Gallery';
import Wall from './Wall/Wall';
import Friend from './Friend/Friend';
import SignUp from './Authentication/SignUp'

import { Sticky, Container, Grid } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment >
        <Sticky>
          <div style={{ marginBottom: '1em' }}>
            <Header />
            <Navbar />
          </div>
        </Sticky>
        <div style={{ display: 'flex' }}>
          <VerticalMenu />
          <div style={{ width: '60%' }}>
            <Switch>
              <Route exact path="/" component={Message} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/wall" component={Wall} />
              <Route path="/friend" component={Friend} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default globalErrorHandler(App);
