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
import {createUser,getUserById} from '../../store/actions/authActions' // '../../actions/index';
import * as actions from '../../store/actions/authActions'

import {FormBody,FormButtonPanel,FormContainer,FormHeader} from "../ui/form/Index";
import ProgressButton from "../ui/button/ProgressButton";
import ProgressButton1 from "../ui/button/ProgressButton1";
import submit from "./submit";

class SignUpForm extends Component {

    componentDidUpdate(){

        console.log("SignUpForm- component did update user", this.props);
     /* if (this.props.user){
          this.props.initialize({lastName:user.lastName})
      }*/
    }

    componentWillMount(){

        const userId='5b2ed0f2b639a27c11559e58';
        console.log("SignUpForm- component did MOUNT AAAA", this.props);
//  const user= this.props.getUserById(userId);



      //  console.log("SignUpForm- component did MOUNT BBBB", user);

    }

    renderContent() {



        return (
            <div>

                <Field

                    component={FormInput}
                    type="text"
                    label='Id'
                    name='_id'
                    width ='300'
                    disabled


                />

                <Field

                    component={FormInput}
                    type="text"
                    label='Last Name'
                    name='lastName'
                    width ='200px'


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
        const { handleSubmit, userId } = this.props;
        const contactId ="raj"
        return (
            <FormContainer>

                <FormHeader title="Sign Up" text="Please enter the values" />



                <form onSubmit={handleSubmit}>


                    <FormBody>
                        {this.renderContent()}

                    </FormBody>


                    <FormButtonPanel>



                        <ProgressButton1  variant="raised"  color="primary"
                            formName='initializeFromState'
                                          disabled ={this.props.processing}
                                          processing={this.props.processing}
                                          icon='person_add' >
                            {userId? 'update' : 'submit'}
                        </ProgressButton1>

                        <ProgressButton1 variant="raised" color='secondary'
                            formName='initializeFromState'
                                          disabled ={this.props.processing}
                                          processing={this.props.submitting}
                                          icon='loop'
                        actionSubmit={false}
                        clickAction={this.props.reset}>
                            reset
                        </ProgressButton1>
                    </FormButtonPanel>

                </form>
            </FormContainer>

        )
    }
}

const mapDispatchToProps= dispatch=> {
    return {
      //  createUser: (user, history) => dispatch(createUser(user, history)),
      //  createUser: (dispatch) => createUser(dispatch),
        getUserById: (userId)=>dispatch(getUserById(userId))
    }
}

const mapStateToProps=state=>{

    return {
        user : state.auth.user,
        userId : state.auth.user? state.auth.user._id :'',
        processing: state.auth.processing,
        token : state.auth.token,
        initialValues: state.auth.user

    }
}

const onSubmit = (values, dispatch,props) => {
    console.log('ON SUBMIT props ', props);

    if (props.userId)
    {
        dispatch(  actions.updateUser(props.userId,values))
    }else
    {
        dispatch(  createUser(values))
    }
     // your submit action //      );
};

const validate = values => {
    const errors = {}
    if (!values.lastName) {
      errors.lastName = 'Required'
    } else if (values.lastName.length < 2) {
      errors.lastName = 'Must be 2 characters or less'
    }

    return errors;
}

//export default connect(mapStateToProps,mapDispatchToProps)(InitializeFromStateForm);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        validate,
        form: 'initializeFromState',
        enableReinitialize:true,
        destroyOnUnmount: false,
        onSubmit

    })
)(SignUpForm);

