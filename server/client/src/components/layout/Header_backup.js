import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  './Header.css';
//import SurveyList from './surveys/SurveyList';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    },
    tabRoot: {
        width:'50px'
    },
});

class Header extends Component {

    state = {
        value: '/',
    };

    componentDidMount(){


        const presentRoute = this.props.location.pathname;

        console.log('HEADER-component did mount', presentRoute);

        this.setState({value:presentRoute});

        if (presentRoute=='/Surveys'){

        }


    }

    componentDidUpdate(){
        console.log('HEADER-component did update',  this.props);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    renderContent() {

        console.log('Header renderContent()');
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return  <li ><a href="/api/logout">Logout</a></li>
        }
    }


    render() {

        const { value } = this.state;
        const { classes } = this.props;

        return (


            <AppBar  position="static">
                <Toolbar>
                    <IconButton  color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography  style={{ 'flex': 1 }} variant="title" color="inherit" >
                        Title
                    </Typography>
                    <Tabs value={value}  onChange={this.handleChange}>

                        <Tab value ='/'
                             classes={{ root: classes.tabRoot }}
                             label='A'
                             component={Link}
                             to={'/'}
                        />



                        <Tab value ='/surveys' label='B '
                             component={Link}
                             style={{width:'20px'}}
                             to={'/surveys'}/>
                        <Tab value ='2'

                             label='C '/>

                    </Tabs>



                </Toolbar>






            </AppBar>









        )
    }

    /* render() {
         console.log(this.props);
         return (
             <nav>
                 <div className="nav-wrapper">
                     <Link
                         to={this.props.auth ? '/surveys' : '/'}
                         className="left brand-logo"
                     >
                         Emaily
                     </Link>
                     <ul className="right">
                         {this.renderContent()}
                     </ul>
                 </div>
             </nav>
         );
     }*/
}

function mapStateToProps({ auth }) {
    return { auth };
}



Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(Header);

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Header)));

/* render() {
     const { classes } = this.props;
     const { value } = this.state;

     return (
         <div >
             <AppBar position="static">
                 <Tabs value={value} onChange={this.handleChange}>
                     <Tab value="0" label="New Arrivals in the Longest Text of Nonfiction" />
                     <Tab value="2" label="Item Two" />
                     <Tab value="3" label="Item Three" />
                 </Tabs>
             </AppBar>

         </div>
     );
 }
}

Header.propTypes = {
 classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
*/