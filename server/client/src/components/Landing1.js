import React, {Component} from 'react';
//import './Landing.css'
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import FileUpload from '@material-ui/icons/FileUpload';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


//import SurveyList from './surveys/SurveyList';

class Landing extends Component {
    /*
        theme = createMuiTheme({

            overrides: {
                MuiButton: { // Name of the component ⚛️ / style sheet
                    root: { // Name of the rule
                        color:'red', // Some CSS
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    },
                },
            }
        });*/

    theme = createMuiTheme({
        /*
                overrides: {
                    MuiButton: { // Name of the component ⚛️ / style sheet
                        root: { // Name of the rule
                            color: 'red', // Some CSS
                        },
                    },
                },*/
        palette: {

            primary: {
                main:'#2196F3'
            },
            secondary:{
                main:'#F44336'
            }
        },
    });

    /*theme = createMuiTheme({
        overrides: {
            // Name of the component ⚛️ / style sheet
            MuiButton: {
                // Name of the rule
                root: {
                    // Some CSS
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    borderRadius: 3,
                    border: 0,
                    color: 'white',
                    height: 48,
                    padding: '0 30px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
                },
            },
        },
    });*/



    renderContent() {
        return (
            <div>
                <MuiThemeProvider theme={this.theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton  color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" >
                                Title
                            </Typography>
                            <Button color="inherit" className="right">Login</Button>
                        </Toolbar>
                    </AppBar>




                    <Button variant="raised"  color="primary"  onClick={() => { console.log('onClick'); }}>
                        Hello World
                    </Button>

                    <Button variant="raised" color="secondary"  onClick={() => { console.log('onClick'); }}>
                        secondary
                    </Button>


                    <TextField  inputProps={{ style: {  color: 'red'}}}

                                label="Search field"

                    />

                </MuiThemeProvider>

            </div>

        )
    }

    render() {
        return(
            <div>
                {this.renderContent()}

            </div>
        );
    }

}


export default Landing;
