import React, { Component } from 'react';
import { reduxForm, Field, getFormSubmitErrors, getFormSyncErrors, getFormMeta } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment'
import { Segment, Card,Form, Dimmer, Input, Button, Loader, Modal as ModalComponent } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
//import Loader from 'react-loader-spinner'
import * as FIELDS from '../UI/FormFields'
import DropZone from '../UI/DropZone/DropZone'
import * as ACTIONS from '../../store/actions/authActions'
import { required } from '../../utils/validationUtil'
import Logger from 'logger';

const logger = Logger('SignUpForm');

class SignUpForm extends Component {

  state = {
    firstName: 'aa',
    lastName: '',
    dob: '',
    date: '',
    open: false
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

  openModalHandler = (e) => {
    logger.log('openModalHandler')
    e.preventDefault();
    this.setState({ open: true })
  }
  onCloseModalHanlder = () => {
    this.setState({ open: false })
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
  submit = (values) => {
    logger.log('inside form submit values', values)
    this.props.createUser(values)
  }

  render() {
    this.radioHasError()
    const { handleSubmit, formSubmitError, formSyncError, formMeta, processing } = this.props
    logger.log('formSyncError:', formSyncError)
    logger.log('formMeta:', formMeta)
    logger.log('formSubmitError:', formSubmitError)
    logger.log('processing:', processing)

    return (
      <React.Fragment>

      <Card fluid>
      <Card.Content>
        <Form onSubmit={handleSubmit(this.submit)}>

          <Loader style={{ color: 'green' }} size='massive' active={processing}></Loader>


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

          <Form.Group>
            <Field width={4} disabled={processing}
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
            <Field width={4} disabled={processing}
              component={FIELDS.InputField}
              validate={(value) => required(value, 'last name')}
              label="Last Name"
              name="lastName"
              placeholder="last name"
            />
            <Field width={4} disabled={processing}
              component={FIELDS.InputField}
              validate={(value) => required(value, 'email')}
              label="email"
              name="email"
              placeholder="email"
            />
            <Field width={4} disabled={processing}
              component={FIELDS.InputField}
              validate={(value) => required(value, 'password')}
              label="Password"
              name="password"
              placeholder="password"
            />
          </Form.Group>
          <Field disabled={processing}
            component={FIELDS.InputField}
            as={Form.Input}
            //  validate={(value) => required(value, 'first name')}
            type="text"
            label="First name"
            name="firstName"
            placeholder="First name"
          />
          <Field disabled={processing}
            component={FIELDS.DateField}
            //  validate={(value) => required(value, 'date of birth')}
            label="Date of Bith"
            name="dob"
            placeholderText="Select a date between today and 5 days in the future"
          />
          <Field disabled={processing}
            component={FIELDS.CheckboxField}
            //  validate={(value) => required(value, 'checkbox')}
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
            name="firstName"
            placeholder="First name"
          />
          <Field width={4} disabled={processing}
            component={FIELDS.RadioMultiField}
            label="RadioMulti"
            name="radioMulti"
            testValue={[{ label: 'labelOne', value: 'one' },
            { label: 'labelTwo', value: 'two' }]}
            validate={required}
          />
          <Field disabled={processing}
            component={DropZone}
            label="Drop Zone label"
            name="DropZoneName"
            placeholder="drop zone placeholder"
          />
          <Form.Group>
            <Field width={4}
              component={FIELDS.InputField}
               disabled
              label="dummy field"
              name="dummy"
              placeholder="dummy"
            />
          
          </Form.Group>

          <Button primary loading={processing} disabled={processing} type="submit">
            Submit</Button>

        </Form>
        </Card.Content>
</Card>
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
  dispatch(ACTIONS.createUser(values));
};

const mapStateToProps = state => {
  console.log('mapStateToprops state', state);
  return {
    processing: state.auth.processing,
    formSyncError: getFormSyncErrors('SignUpForm')(state),
    formMeta: getFormMeta('SignUpForm')(state),
    formSubmitError: getFormSubmitErrors('SignUpForm')(state),
    initialValues: {
      // firstName: 'rajesh',
      //  quantity:1,
      radioMulti: 'one',
      chekbox1: true,
      dob: '01/01/2019'

    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: (user) => dispatch(ACTIONS.createUser(user))

  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    validate,
    form: 'SignUpForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    // onSubmit: submit

  })
)(SignUpForm);