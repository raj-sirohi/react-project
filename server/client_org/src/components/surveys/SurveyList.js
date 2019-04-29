import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SurveyList extends Component{

    componentDidMount(){
        this.props.fetchSurveys();
        console.log('component did mount-survey list',this.props);
    }

    renderContent(){
        return(

            <div>
                <h2>SurveyList</h2>
            </div>
            )

    }

   render(){

       return(
           <div>
               {this.renderContent()}
           </div>

       );
   }
}

const mapStateToProps = state => {
    return {
        state:state
    };
};

/*const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(actions.getAllPosts()),
        getPostById: id => dispatch(actions.getPostById(id)),
        getPostByIdStart: () => dispatch(actions.getPostByIdStart())
    };
};*/

//export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));

export default connect(mapStateToProps,actions)(SurveyList);