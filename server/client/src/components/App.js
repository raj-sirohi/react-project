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

        {/* <Grid  >
          <Grid.Row columns={2} only='computer tablet'>
            <Grid.Column width={2} >
              <VerticalMenu />
            </Grid.Column>
            <Grid.Column tablet={14} computer={9}>
              <Switch>
                <Route exact path="/" component={Message} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/wall" component={Wall} />
                <Route path="/friend" component={Friend} />
                <Route path="/signup" component={SignUp} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
         
          <Grid.Row columns={1} only='mobile'>
          <Grid.Column width={16} >
              <Switch>
                <Route exact path="/" component={Message} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/wall" component={Wall} />
                <Route path="/friend" component={Friend} />
                <Route path="/signup" component={SignUp} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid> */}


        <div style={{ display: 'flex' }}>
          <div className='vertical-menu' >
            <VerticalMenu />
          </div>
         
          <div className='main-content'>
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
