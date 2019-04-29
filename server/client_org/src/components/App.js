import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Redirect from './Redirect'

import Header from './layout/Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import BlogForm from './blog/BlogForm';
import SampleForm from './SampleForm'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUpForm from './localAuthentication/SignUpForm'
import globalErrorHandler from '../hoc/errorHandler/globalErrorHandler';
import MessageWithOneButton from './ui/message/MessageWithOneButton'
import './App.css';
class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    theme = createMuiTheme({
       
       
        
        typography: {
            useNextVariants: true,
            suppressDeprecationWarnings: true
        },
        palette: {

            primary: {
                main: '#2196F3'
            },
            secondary: {
                main: '#F44336'
            }

        },
        action: {
            main: '#009688'
        },
    });

    render() {
        return (
            <MuiThemeProvider theme={this.theme}>
                <BrowserRouter>
                    <div >
                        <Header />
                        <div style={{ marginTop: '84px' }}>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNew} />
                            <Route path="/blog/new" component={BlogForm} />
                            <Route path="/signup" component={SignUpForm} />
                        </div>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}


export default connect(null, actions)(globalErrorHandler(App));

//export default DataSync(connect(mapStateToProps, mapDispatchToProps)(SomeOtherComponent));
//export default globalErrorHandler(connect(mapStateToProps, actions)(App));
