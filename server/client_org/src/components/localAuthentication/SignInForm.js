import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withRouter } from 'react-router-dom';

import FormInput from '../ui/form/FormInput'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
//import {createUser, getUserById} from '../../actions/index';
//import * as actions from "../../actions";

import {FormBody, FormButtonPanel, FormContainer, FormHeader} from "../ui/form/Index";
import ProgressButton from "../ui/button/ProgressButton";
import ProgressButton1 from "../ui/button/ProgressButton1";
import submit from "./submit";
import {signIn,clearErrorMessage} from '../../store/actions/authActions';    //from "../../actions";
import Divider from '@material-ui/core/Divider';
//import MessageWithOneButton from '../ui/message/MessageWithOneButton'


class SignInForm extends Component {

    renderContent() {

        return (
            <div>

                <Field
                    component={FormInput}
                    type="text"
                    label='Email'
                    name='email'
                    width='500'

                />

                <Field
                    component={FormInput}
                    type="text"
                    label='Password'
                    name='password'
                    width='200px'
                />

            </div>
        )
    };

    resetHandler=()=>{
        this.props.clearErrorMsg( this.props.reset);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <FormContainer>

                <FormHeader title="Sign In"
                            text="Please enter the values"
                            error={this.props.errorMessage}
                />
                <form onSubmit={handleSubmit}>

                    <FormBody>
                        {this.renderContent()}

                    </FormBody>
                    <FormButtonPanel>

                        <ProgressButton1 variant="contained" color="primary"
                                         formName='signInForm'
                                         disabled={this.props.processing}
                                         processing={this.props.processing}
                                         icon='person'>
                                        Sign In
                        </ProgressButton1>

                        <ProgressButton1 variant="contained" color='secondary'
                                         formName='signInForm'
                                         disabled={this.props.processing}
                                         processing={this.props.submitting}
                                         icon='loop'
                                         actionSubmit={false}
                                         clickAction={this.resetHandler}>
                                         reset
                        </ProgressButton1>
                    </FormButtonPanel>
                    <Divider/>
                    <div style={{width:'80%', padding:" 10px 0 10px 0",margin:'auto'}}>
                        <Button style={{width:'100%',textTransform: 'capitalize'}}
                                color="primary" variant="outlined"
                                href="/auth/google"
                        > <Icon style={{marginRight: '15px'}}>person</Icon>Login with Google
                        </Button>
                        <Button style={{marginTop:'10px',width:'100%',textTransform: 'capitalize'}}
                                variant="contained" color="primary"><Icon style={{marginRight: '15px'}}>person_add</Icon>
                        Sign Up
                        </Button>

                    </div>

                </form>
            </FormContainer>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {

        signIn: (userInfo) => dispatch(signIn(userInfo)),
        clearErrorMsg: (callback)=>dispatch(clearErrorMessage(callback))
    }
}

const mapStateToProps = state => {

    return {
        processing:state.auth.processing,
        token: state.auth.token,
        errorMessage: state.auth.errorMessage
    }
}

const onSubmit = (values, dispatch, props) => {
    console.log('Sign in props', props);
    dispatch(signIn(values,()=>{
        props.history.push("/dashboard");
    }))
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    reduxForm({
        form: 'signInForm',
        destroyOnUnmount: true,
        onSubmit

    })
)(SignInForm);

