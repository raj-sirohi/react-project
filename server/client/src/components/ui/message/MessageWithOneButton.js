
import React ,{Component} from 'react';
//import { connect } from 'react-redux'
//import { submit } from 'redux-form'
//import PropTypes from 'prop-types';
import ModalContainer from '../modal/ModalContainer';
import ModalHeader from '../modal/ModalHeader';
import ModalBody from '../modal/ModalBody'
import ModalButtonPanel from '../modal/ModalButtonPanel';
import ProgressButton1 from '../button/ProgressButton1'

import "./message.css";
import Logger from '../../../loggingUtil/logger';

class MessageWithOneButton extends Component{
    logger = Logger('MessageWithOneButton');

    componentDidMount(){
        this.logger.log('componentDidMount');
    }

    render(){
        return(
            <ModalContainer show={this.props.display} >
            <ModalHeader title={this.props.title}></ModalHeader>
             <ModalBody>
            <p>{this.props.message}</p>
            </ModalBody> 
            <ModalButtonPanel>
            <ProgressButton1 color="primary"
                       actionSubmit={false}
                       clickAction={this.props.closeModalHandler}>
                           close
                       </ProgressButton1>
            </ModalButtonPanel>
            </ModalContainer>
        )
    }
}

export default MessageWithOneButton;