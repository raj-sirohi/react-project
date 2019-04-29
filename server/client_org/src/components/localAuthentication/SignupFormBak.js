import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {compose} from 'redux';

import FormInput from '../ui/form/FormInput'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import {createUser,getUserById} from '../../actions/index';
import * as actions from "../../actions";

import {FormBody,FormButtonPanel,FormLayout,FormHeader} from "../ui/form/Index";
import ProgressButton from "../ui/button/ProgressButton";

class SignUpForm extends Component {

    componentDidUpdate(){

        console.log("SignUpForm- component did update user", this.props);
        // const userId = this.props.user._id;
        const userId='5b2ed0f2b639a27c11559e58';
        this.props.getUserById(userId);
    }

    componentWillMount(){

        const userId='5b2ed0f2b639a27c11559e58';
        console.log("SignUpForm- component did MOUNT AAAA", this.props);
        const user =  this.props.getUserById(userId);
        console.log("SignUpForm- component did MOUNT BBBB", user);

    }

    renderContent() {

        const lastName = this.props.user? this.props.user.firstName:'';
        const token = this.props.token? this.props.token:'';

        console.log("Token--------", token);

        return (
            <div>

                <Field

                    component={FormInput}
                    type="text"
                    label='Last Name'
                    name='lastName'
                />

                <Field

                    component={FormInput}
                    type="text"
                    label='First Name'
                    name='firstName'
                />
                <Field

                    component={FormInput}
                    type="text"
                    label='Email'
                    name='email'
                />
                <Field

                    component={FormInput}
                    type="password"
                    label='password'
                    name='password'
                />

                <Field

                    component={FormInput}
                    type="text"
                    label='Date of Birth'
                    name='dob'
                />

                <Field

                    component={FormInput}
                    type="text"
                    label='idType'
                    name='idType'
                />


            </div>
        )
    }

    render() {

        return (
            <FormLayout>

                <form onSubmit={this.props.handleSubmit((values)=>this.props.createUser(values,this.props.history))}>
                    <FormHeader title="Sign Up" text="Please enter the values">


                    </FormHeader>

                    <FormBody>
                        {this.renderContent()}

                    </FormBody>


                    <FormButtonPanel>
                        <Button style={{marginRight:'10px'}} variant="raised" type='submit' color="primary" >
                            <Icon style={{marginRight:'5px'}}>person_add</Icon>  Sign Up
                        </Button>

                        <Button variant="raised" color="secondary"  onClick={() => { console.log('onClick'); }}>
                            <Icon style={{marginRight:'5px'}}>cancel</Icon> Cancel
                        </Button>

                        <ProgressButton>
                            <Icon style={{marginRight:'5px'}}>person</Icon> test progress
                        </ProgressButton>
                    </FormButtonPanel>

                </form>
            </FormLayout>

        )
    }
}

const mapDispatchToProps= dispatch=> {
    return {
        createUser: (user, history) => dispatch(createUser(user, history)),
        getUserById: (userId)=>dispatch(getUserById(userId))
    }
}

const mapStateToProps=state=>{

    return {
        user : state.localAuth.user,
        processing: state.localAuth.processing,
        token : state.localAuth.token,
        initialValues: state.localAuth.user

    }
}


let InitializeFromStateForm = reduxForm({
    form: 'initializeFromState',
    enableReinitialize:true
})(SignUpForm);

InitializeFromStateForm = connect(
    state => ({

        initialValues: state.localAuth.user
    }),
    { getUserById }
)(InitializeFromStateForm);

export default InitializeFromStateForm;


/*
SignUpForm= reduxForm({
  //  validate,
    form: 'signUpForm',
    destroyOnUnmount: false,
    enableReinitialize:true
})(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));

export default connect(
    state => ({
        initialValues: state.localAuth.user// pull initial values from account reducer
    }),
    { getUserById}
)(SignUpForm);
*/

