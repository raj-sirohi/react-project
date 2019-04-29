import React,{Component} from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
//import { getUserByToken } from '../actions';
import {getUser,getUserFromToken} from '../actions/index';
import Logger from '../loggingUtil/logger';

class Dashboard extends Component{

    state={
        user:'',
        error:''
    }
    logger = Logger('Dashboard');
    
    componentDidMount(){
       // this.logger.log('componentDidMount');
        const token= this.getTokenFromURL();
        if (!!token){
        // this.logger.log('componentDidMount- token from google', token);
         this.props.getUserFromToken(token);
        }else{
           // this.logger.log('componentDidMount- local authentication');
            this.props.getUserFromToken();
        }
        
       // this.logger.log('component did mount:user',this.props);
    }

    getTokenFromURL=()=>{
        const query = new URLSearchParams(this.props.history.location.search);
                let token = null;
                for (let param of query.entries()) {
                   // this.logger.log('getTokenFromURL', param)
                    if (param[0] === 'token') {
                        token = param[1];
                    }
                }
                return token;
    }

    componentDidUpdate() {
       // this.setState({ user: this.props.user });
       // this.logger.log('componentDidUpdate', this.state);
    }

    render(){
      // var lastName= this.props.user?this.props.user.lastName:'not define';
        return (
            <div>
                <h2>Dashboard</h2>
                
                <SurveyList/>
                <div className="fixed-action-btn">
                    <Link to="/surveys/new" className="btn-floating btn-large red">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps=state=>{

    return {
        user : state.localAuth.user,
        error: state.localAuth.errorMessage
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        getUserFromToken:(token)=>dispatch(getUserFromToken(token))
    }

}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
