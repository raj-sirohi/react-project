import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import Message from './Message/Message';
import Gallery from './Gallery/Gallery';
import Wall from './Wall/Wall';
import Friend from './Friend/Friend';
import SignUp from './Authentication/SignUp'

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
