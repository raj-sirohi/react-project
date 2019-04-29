import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Redirect from './Redirect'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import HelpIcon from '@material-ui/icons/Help';

import TabButton from './ui/TabButton';
import './Header.css'



const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    },
    flex: {
        flex: 1,
    },
    tabRoot: {
        minWidth: 50,
    },
});

class Header extends React.Component {
    state = {
        value: '/',
    };

    componentDidMount(){

        console.log('HEADER componentDidMount props', this.props);
        const presentRoute = this.props.location.pathname;


        this.setState({value:presentRoute});


    }

    componentDidUpdate(){

        console.log('HEADER componentDidUpdate props', this.props);

        // this.renderContent();
    }

    renderContent() {
        const {classes} = this.props;
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return   <Button  href="/auth/google"
                                  style={{color:'white'}}
                                  component={Tab}

                                  value='/auth/google'
                                  label='login'>tet</Button>

            //<li><a href="/auth/google">Login With Google</a></li>;
            default:
                return   <Button  href="/api/logout"
                                  style={{color:'white'}}
                                  component={Tab}

                                  value='/api/logout'
                                  label='log out'>tet
                </Button>

            //<li ><a href="/api/logout">Logout</a></li>
        }
    }

    renderLoggedInInfo() {
        // for local authentication
        const {authenticated} = this.props;
        const userName = this.props.user ? this.props.user.firstName :'';

        return (
            <div>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Typography style={{'flex': 1,display:'inline'}} variant="title" color="inherit">
                    {authenticated ? userName : ''}
                </Typography>

            </div>




        )
    }

    handleChange = (event, value) => {
        if (value=="/auth/google")
        {
            //  this.props.history.push(value);
        }
        this.setState({value});
    };

    render() {
        const {value} = this.state;
        const {classes} = this.props;


        return (


            <div className={classes.root}>
                <AppBar position='fixed'>
                    <Toolbar >



                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex} style={{display:'inline'}}>
                            {this.props.auth ? 'logged in' : 'logged out'}
                        </Typography>

                        <Tabs  value={value} onChange={this.handleChange}>

                            <Tab value='/'
                                 classes={{root: classes.tabRoot}}
                                 label='Home'
                                 component={Link}
                                 to={'/'} />


                            <Tab value='/surveys'
                                 label='Surveys'
                                 classes={{root: classes.tabRoot}}
                                 component={Link}

                                 to={'/surveys'}> <Icon>input</Icon>
                            </Tab>

                            <Tab value='/signup'
                                 label='sign up'
                                 classes={{root: classes.tabRoot}}
                                 component={Link}

                                 to={'/signup'}> <Icon>input</Icon>
                            </Tab>


                            {this.renderContent()}




                        </Tabs>




                        <TabButton icon1='home' label1='tabButton' href="/auth/google"/>

                        <Button color="secondary" href="/auth/google" aria-label="Add an alarm">
                            <Icon>input</Icon>
                        </Button>





                        <Icon  style={{marginRight: '5px', color:'#E3F2FD'}}>person</Icon>
                        <Typography color='inherit'  variant="body2">
                            Rajesh
                        </Typography>


                    </Toolbar>



                </AppBar>


            </div>


        )
    }
}

/*BasicTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTabs);*/

/*function mapStateToProps({ auth }) {
    return { auth};
}*/

const mapStateToProps=(state) =>{
    return {
        auth:state.auth,
        user : state.localAuth.user,
        authenticated:state.localAuth.authenticated};
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(Header);

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Header)));
