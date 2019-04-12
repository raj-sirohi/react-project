import React, { Component } from 'react';
import { reduxForm, Field, getFormSubmitErrors, getFormSyncErrors,getFormMeta } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment'
import { Form, Icon, Button, Input, Grid, Header,Dropdown } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import DateCustom from './DateCustom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import {semanticInputField} from '../ui/semanticFormFields/semanticInputFields'
//import Logger from '../../loggingUtil/logger'
//import {semanticInputField, semanticCheckbox} from '../ui/semanticFormFields'
import * as FIELDS from '../ui/formFields'
import * as FIELDS2 from '../ui/fields'
import { required } from '../../utils/validationUtil'

import Logger from 'logger';


// const logger = Logger('SignUpForm');
// const options = [
//   { key: 1, text: 'One', value: 1 },
//   { key: 2, text: 'Two', value: 2 },
//   { key: 3, text: 'Three', value: 3 },
// ]


//   const renderSelect = ({ input: { value, onChange, ...input },
//     meta: { touched, error, warning }, as: As = Input, ...props }) => (
//       <React.Fragment>
     
//       <Form.Dropdown error={touched && !!error} className={(touched && !!error) ? 'aaa' : '50px'}
//         {...input}
//         {...props}
//         fluid
        
//         onChange={(e, { value }) => onChange(value)}
//         clearable
//         value={value}
//       />
        
    
//       {touched && ((error && <label style={{ display: 'inline-block', marginBottom: '14px' }}
//                   className='form_input--errorMessage' ><i>{error}</i></label>))}
//       </React.Fragment>
//     );

// const renderSelect1 = ({ input: { value, onChange, ...input },
//   meta: { touched, error, warning }, as: As = Input, ...props }) => (
//     <React.Fragment>
//     <Form.Field className={(touched && !!error) ? 'aaa' : '50px'} error={touched && !!error}>
//     <Form.Dropdown
//       {...input}
//       {...props}
//       fluid
      
//       onChange={(e, { value }) => onChange(value)}
//       clearable
//       value={value}
//     />
      
//     </Form.Field>
//     {touched && ((error && <label style={{ display: 'inline-block', marginBottom: '14px' }}
//                 className='form_input--errorMessage' ><i>{error}</i></label>))}
//     </React.Fragment>
//   );
// const required1 = value => (value ? undefined : 'Required');

// const required2 = (value, allValues, props, errorMessage) => (value ? undefined : 'Required');

// const required3 = (value, allValues, props, errorMessage) => {
//   logger.log('value', value);
//   logger.log('errorMessage', errorMessage);


//   return (value ? undefined : 'Required');
// }

// const renderDatePicker1 = ({ input, placeholder, defaultValue, meta: { touched, error } }) => (
//   <div>
//     <DatePicker {...input} dateForm='MM/DD/YYYY' selected={input.value ? moment(input.value) : null}
//     />

//   </div>
// );

// const renderDatePicker = ({ input, label, defaultValue, meta: { touched, error }, ...rest }) => {
//   // logger.log('renderDatePicker',rest)
//   return (
//     <div>
//       <label style={{ fontStyle: 'bold' }}>{label}</label>
//       <DatePicker {...rest}
//         selected={input.value ? moment(input.value).toDate() : null}
//         onChange={input.onChange}
//       />
//     </div>
//   )
// }

// const renderDatePicker_working = (props) => {
//   return (
//     <DatePicker
//       selected={props.input.value || null}
//       onChange={props.input.onChange}
//     />
//   )
// }

class SignUpForm extends Component {

  state = {
    firstName: 'aa',
    lastName: '',
    dob: '',
    date: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = (values, dispath) => {
    logger.log('handleSubmit values', values);
    logger.log('handleSubmit dispath', dispath);
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

  renderRadioError = () => {
    const { fieldError, submitFailed } = this.props;
   
    if (submitFailed) {
      if (!!fieldError.quantity) {
       
        return fieldError.quantity;
      }
    }

    return false;
  }



  radioHasError=()=>{
    const {fieldError,fieldMeta}=this.props;
    logger.log('radioHasError fieldError',fieldError);
    logger.log('radioHasError fieldMeta',fieldMeta);
    if (!!fieldMeta.quantity && !!fieldMeta.quantity.touched){

      logger.log('radioHasError quantity touched');
      if (!!fieldError && !!fieldError.quantity){
        logger.log('radioHasError fieldError.quantity',fieldError.quantity);
        return true;
      }
    }
    return false;

  }

  render() {
     console.log('render this.props', this.props)
     this.radioHasError()
    const { handleSubmit, submitErrors } = this.props
   
    if (!this.isEmpty(submitErrors)) {
     
    }
    return (
      <div>

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
              validate={(value) => required(value, 'gender')}
            
            />

            <Field
              component={FIELDS.InputField}
              as={Form.Input}
              validate={(value) => required(value, 'first name')}
              //validate={required}
              type="text"
              label="First name"
              name="firstName"
              placeholder="First name"

            />
       
          <Field
            component={FIELDS.DateField}
            // validate={required}
            validate={(value) => required(value, 'date of birth')}
            label="Date of Bith"
            name="dob2"
            placeholderText="Select a date between today and 5 days in the future"

          />

          <Field 
            component={FIELDS.CheckboxField}
           
            validate={(value) => required(value, 'last name')}
            label="last name"
            name="lastName"
            type='checkbox'
            bogusprops='bogusValue'
            placeholder="last name"
          />
        
           

          <Form.Group inline style={{marginBottom:this.radioHasError()?'1px':'14px'}} >

            <label  >Quantity</label>

            <Field
              component={FIELDS.RadioField}
              label="One"
              name="quantity"
              radioValue={1}
              validate={required}
            />
            <Field

              component={FIELDS.RadioField}
              label="Two"
              name="quantity"
              radioValue={2}
              validate={required}

            />
            <Field
              component={FIELDS.RadioField}
              label="Three"
              name="quantity"
              radioValue={3}
              validate={required}

            />
            
          </Form.Group>
          <label style={{ marginBottom:'14px',display: 'inline-block',color: '#9f3a38' }}>
          {this.renderRadioError()}
          </label>
         
        
            <Field
              component={FIELDS.InputField}
              as={Form.Input}
              validate={(value) => required(value, 'first name')}
              //validate={required}
              type="text"
              label="First name"
              name="firstName1"
              placeholder="First name"

            />

          <button type="submit">Submit</button>
        </Form>



      </div>
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