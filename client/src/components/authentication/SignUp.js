import React, { Component } from 'react';
import { reduxForm, Field, getFormSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Icon } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import DateCustom from './DateCustom';
//import Logger from '../../loggingUtil/logger'
import Logger from 'logger';


const logger = Logger('SignUpForm');


class SignUpForm extends Component {

  state = { date: '' }

 

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
       
          <Field name="firstName" component="input" type="text" /> 
          <button type="submit">Submit</button>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}
  return errors;
}

// form submit action
const onSubmit = (values, dispatch, props) => {
  logger.log('ON SUBMIT VALUES ', values);

};

export default compose(
 // connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    validate,
    form: 'SignUpForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmit

  })
)(SignUpForm);