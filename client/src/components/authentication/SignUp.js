import React, { Component } from 'react';
import { reduxForm, Field, getFormSubmitErrors, getFormSyncErrors, getFormMeta } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment'
import { Form,Segment, Icon, Button, Input, Grid, Header, Dropdown,
  TransitionablePortal,Image,Modal as ModalComponent } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
import * as FIELDS from '../UI/FormFields'
import DropZone from '../UI/DropZone/DropZone'
import { required } from '../../utils/validationUtil'
import Logger from 'logger';

const logger = Logger('SignUpForm');

class SignUpForm extends Component {

  state = {
    firstName: 'aa',
    lastName: '',
    dob: '',
    date: '',
    open:false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = (values, dispath) => {
  }

  renderError = () => {
    // logger.log('renderError', this.props)
    return (
      <span >Error</span>
    )
  }

  isEmpty = (myObject) => {
    for (var key in myObject) {
      if (myObject.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }

  openModalHandler=(e)=>{
    logger.log('openModalHandler')
    e.preventDefault();
    this.setState({open:true})
}
onCloseModalHanlder=()=>{
    this.setState({open:false})
}

  renderRadioError = () => {
    const { fieldError, submitFailed } = this.props;
    if (submitFailed) {
      if (!!fieldError.quantity) {
        return fieldError.quantity;
      }
    }
    return false;
  }

  radioHasError = () => {
    const { fieldError, fieldMeta } = this.props;
    if (!!fieldError && !!fieldError.quantity) {
      if (!!fieldMeta.quantity && !!fieldMeta.quantity.touched) {
        return true;
      }
    }
    return false;
  }

  render() {
    this.radioHasError()
    const { handleSubmit, submitErrors } = this.props
    if (!this.isEmpty(submitErrors)) {
    }
    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
          <Field
            component={FIELDS.DropListField}
            label="Gender"
            name="gender"
            options={[
              { key: "m", text: "Male", value: "maleValue" },
              { key: "f", text: "Female", value: "femaleValue" }
            ]}
            placeholder="placeholder Gender"
            selection
          // validate={(value) => required(value, 'gender')}
          />
          <Field
            component={FIELDS.InputField}
            as={Form.Input}
            //  validate={(value) => required(value, 'first name')}
            type="text"
            label="First name"
            name="firstName"
            placeholder="First name"
          />
          <Field
            component={FIELDS.DateField}
            //  validate={(value) => required(value, 'date of birth')}
            label="Date of Bith"
            name="dob2"
            placeholderText="Select a date between today and 5 days in the future"
          />
          <Field
            component={FIELDS.CheckboxField}
            validate={(value) => required(value, 'checkbox')}
            label="check box test"
            name="chekbox1"
            bogusprops='bogusValue'
            placeholder="last name"
          />
          <Field
            component={FIELDS.InputField}
            as={Form.Input}
            // validate={(value) => required(value, 'first name')}
            type="text"
            label="First name"
            name="firstName1"
            placeholder="First name"
          />
          <Field
            component={FIELDS.RadioMultiField}
            label="RadioMulti"
            name="radioMulti"
            testValue={[{ label: 'labelOne', value: 'one' },
            { label: 'labelTwo', value: 'two' }]}
            validate={required}
          />
          <Field
            component={DropZone}
            label="Drop Zone label"
            name="DropZoneName"
            placeholder="drop zone placeholder"
          />

          <Field
            component={FIELDS.InputField}
            validate={(value) => required(value, 'first name')}
            label="First name2"
            name="firstName2"
            placeholder="First name"
          />

          <button type="submit">Submit</button>
        </Form>
      
      </React.Fragment>
    )
  }
}

const validate = (values) => {
  const errors = {}
  return errors;
}

// form submit action
const submit = (values, dispatch, props) => {
  logger.log('ON SUBMIT VALUES ', values);
};

const mapStateToProps = state => {
  // console.log('mapStateToprops state',state.form.SignUpForm);
  return {

    fieldError: getFormSyncErrors('SignUpForm')(state),
    fieldMeta: getFormMeta('SignUpForm')(state),
    initialValues: {
      // firstName: 'rajesh',
      //  quantity:1,
      //  radioMulti:'one',
      lastName: false,
      dob: '01/01/2019'

    }
  }
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
    validate,
    form: 'SignUpForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmit: submit

  })
)(SignUpForm);