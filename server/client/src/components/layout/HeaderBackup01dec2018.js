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
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import HelpIcon from '@material-ui/icons/Help';
import Avatar from '@material-ui/core/Avatar';

import './Header.css'
import {signOut,signIn} from "../../actions";
//import logger from 'loggingUtil/logger';
import logger from '../../loggingUtil/logger';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,

    },
    root2: {
        height:0
    },
    wrapper:{
        flexDirection:'row'
    },
    labelContainer:{
        padding:'5px'
    },
    flex: {
        flex: 1,
    },
    tabRoot: {
        minWidth: 50,     // set the minimum width of the underline ( red line) of the tab
    },
    title:{
        marginTop:'20px'
    },
    blueAvatar: {

        color: '#2196F3',
        backgroundColor: 'white',
        marginRight:'5px'
    },
});

class Header extends React.Component {
    Logger = logger('Header');
    state = {
        value: '/',
        signedIn: false,
        value2: '/',
    };

    componentDidMount(){
       // this.Logger.log('HEADER componentDidMount props', this.props);
   // console.log('HEADER componentDidMount props', this.props);
        const presentRoute = this.props.location.pathname;
        this.setState({value:presentRoute});
    }

    componentDidUpdate(){
      //  this.Logger.log('HEADER componentDidUpdate props', this.props);
      if (this.props.authenticated && !this.state.signedIn)
      {
          this.setState({signedIn:true,value:'/dashboard'})
      }
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
                                  label='login with google'>tet</Button>

                //<li><a href="/auth/google">Login With Google</a></li>;
            default:
                return   <Button  href="/api/logout"
                                   style={{color:'white'}}
                                  component={Tab}
                                  value='/api/logout'
                                  label='log out with google'>tet
                   </Button>

                //<li ><a href="/api/logout">Logout</a></li>
        }
    }

    renderLoggedInInfo() {
        // for local authentication
        const {authenticated,classes} = this.props;
        const userName = this.props.user ? this.props.user.firstName :'';

        const authenicatedContent =   authenticated?
            <div style={{display:'flex', alignItems:'center'}}>

                <Avatar color='primary' className={classes.blueAvatar} >
                    <Icon >person</Icon>
                </Avatar>
                <Typography variant="title" color="inherit"  >
                    {userName}
                </Typography>
            </div>:''

        return (
            authenicatedContent
        )
    }

    handleChange = (event, value) => {
        if (value=="/auth/google")
        {
          //  this.props.history.push(value);
        }
        this.setState({value});
    };

    handleChange2 = (event, value2) => {
        if (value2=="/signout")
        {
            
            this.props.signout(()=>{
                this.props.history.push("/");
            })

        }
        this.setState({value2});
    };

    signOutHandler = () => {


        console.log('signOutHandler', this.props);
        this.props.signout(()=>{
            this.props.history.push("/");
        })

        this.setState({signedIn:false,value:"/"});
    }

    render() {
        const {value} = this.state;
        const {classes} = this.props;
        const {value2} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position='fixed'>
                    <Toolbar className='Tabs' >

                   <div>
                       <IconButton color="inherit" aria-label="Menu">
                           <MenuIcon/>
                       </IconButton>
                       <Typography variant="title" color="inherit" className={classes.flex} style={{display:'inline'}}>
                           {this.props.auth ? 'logged in' : 'logged out'}
                       </Typography>

                   </div>
                   
                        <Tabs  value={value} onChange={this.handleChange}>

                            <Tab value='/'
                                 classes={{root: classes.tabRoot}}
                                 label='Landing'
                                 component={Link}
                                 to={'/'} />
                            <Tab value='/dashboard'
                                 classes={{root: classes.tabRoot}}
                                 label='dashboard'
                                 component={Link}
                                 to={'/dashboard'} />
                          

                            <Tab value='/blog/new'
                                 label='blog'
                                 classes={{root: classes.tabRoot}}
                                 component={Link}
                                 to={'/blog/new'}> <Icon>input</Icon>
                            </Tab>
                            <Tab value='/signup'
                                 label='sign up2'
                                 classes={{root: classes.tabRoot}}
                                 component={Link}
                                 to={'/signup'}> <Icon>input</Icon>
                            </Tab>
                            {this.renderContent()}
                        </Tabs>
                        <div style={{display:'flex'}}>

                       
                          {this.renderLoggedInInfo()}
                          <Button color="inherit"
                                  style={{textTransform: 'capitalize'}}
                          onClick ={this.signOutHandler}>
                              <Icon style={{marginRight: '5px'}}>lock_open</Icon>Sign Out</Button>
                        </div>
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
        user : state.auth.user,
        authenticated:state.auth.authenticated};
}

const mapDispatchToProps=dispatch=>{

    return{
     signout :(callBack)=>dispatch(signOut(callBack)),
        signIn :(userInfo)=>dispatch(signIn(userInfo))
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(Header);

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(Header)));
