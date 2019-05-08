import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, TransitionablePortal } from 'semantic-ui-react'

import { clearMessage } from '../../store/actions/messageActions'
import Logger from 'logger';

const logger = Logger('globalErrorHandler');

const globalErrorHandler = (WrappedComponent) => {
    class WrapperComponent extends Component {

        errorConfirmedHandler = () => {
            this.props.clearMessage()
        }

        renderErrorModal = () => {
            let displayModal = false;
            if (this.props.display && this.props.type === 'SYSTEM') {
                displayModal = true;
            }
            return (
                <TransitionablePortal open={displayModal} transition={{ animation: 'fade up', duration: '500' }}>
                    <Modal basic size='small' open onClose={this.errorConfirmedHandler}
                        closeOnDimmerClick={false} closeIcon>
                        <Modal.Header style={{ color: 'red' }}>{this.props.title}</Modal.Header>
                        <Modal.Content>
                            <span style={{ fontSize: '1.2em' }}> {this.props.error}</span>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button inverted primary onClick={this.errorConfirmedHandler}>
                                Ok
                                    </Button>
                        </Modal.Actions>
                    </Modal>
                </TransitionablePortal>
            )

        }

        render() {
            return (
                <React.Fragment>
                    {this.renderErrorModal()}
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            type: state.message.errorDTO.type,
            title: state.message.errorDTO.title,
            error: state.message.errorDTO.error,
            display: state.message.display,
            errorDTO: state.message.errorDTO
        }
    }
    const mapDispatchToProps = dispatch => {
        return {
            clearMessage: () => dispatch(clearMessage())
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent)
}

export default globalErrorHandler;