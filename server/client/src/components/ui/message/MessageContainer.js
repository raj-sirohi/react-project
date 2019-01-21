import React ,{Component}from 'react';
import { connect } from 'react-redux';
import ModalContainer from '../modal/ModalContainer';
import ModalHeader from '../modal/ModalHeader';
import ModalBody from '../modal/ModalBody'


import "./message.css";
import Logger from '../../../loggingUtil/logger';

class MessageContainer extends Component{
    logger = Logger('ModalContainer');

    render(){
        return(
            <ModalContainer show={this.props.showError}  >
            <ModalHeader title='Error!'></ModalHeader>
             <ModalBody>
            <p>{this.props.errorMessage}</p>
            </ModalBody> 
           
               
            </ModalContainer>
        )
    }
}
const mapStateToProps=state=>{

    return {
       
        errorMessage: state.blog.error,
       showError:state.blog.showError,

    }
}
export default connect(mapStateToProps)(MessageContainer);