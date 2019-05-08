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
import Message from './Message/Message';
import Gallery from './Gallery/Gallery';
import Wall from './Wall/Wall';
import Friend from './Friend/Friend';
import SignUp from './Authentication/SignUp'

import {  Container } from 'semantic-ui-react'
import './App.css';


class App extends Component {
  render() {
    return (
      <React.Fragment >
        <Header />
        <Navbar />
        <Container className='app' style={{ padding: '2em' }}>
          <Switch>
            <Route exact path="/" component={Message} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/wall" component={Wall} />
            <Route path="/friend" component={Friend} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}
//export default App;
//export default connect(null, actions)(globalErrorHandler(App));
export default globalErrorHandler(App);
