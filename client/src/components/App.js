import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';
import Header from './header/Header';
import Message from './message/Message';
import Gallery from './gallery/Gallery';
import Wall from './wall/Wall';
import Friend from './friend/Friend';
import SignUp from './authentication/SignUp'

import { Radio, Button, Container, Loader, Segment, Dimmer } from 'semantic-ui-react'
import './App.css';
import { Checkbox } from 'semantic-ui-react'
//import '../semantic/dist/semantic.min.css'

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
export default App;
