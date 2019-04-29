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
import {createUser} from '../../actions/index';
import * as actions from "../../actions";
import FormAux from "../../containers/FormAux"
import FormHeader from "../ui/form/FormHeader";

class SignUpForm extends Component {


    renderContent() {

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
            </div>
        )
    }

    render() {

        return (



            <form onSubmit={this.props.handleSubmit((values)=>this.props.createUser(values,this.props.history))}>
                <FormHeader title="Sign Up" text="Please enter the values">


                </FormHeader>

                {this.renderContent()}


                <Button variant="raised" type='submit' color="primary" >
                    <Icon style={{marginRight:'5px'}}>person_add</Icon>  Sign Up
                </Button>

                <Button variant="raised" color="secondary"  onClick={() => { console.log('onClick'); }}>
                    <Icon style={{marginRight:'5px'}}>cancel</Icon> Cancel
                </Button>
            </form>



        )
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        createUser:(user,history)=>dispatch(createUser(user,history))
    }





}

/*export default reduxForm({
  //  validate,
    form: 'signUpForm',
    destroyOnUnmount: false
})(connect(null, mapDispatchToProps)(SignUpForm));*/

export default compose(

    connect(null,mapDispatchToProps),
    reduxForm({
        //  validate,
        form: 'signUpForm',
        destroyOnUnmount: false
    })

)(SignUpForm)


