import React, { Component } from 'react';
import { reduxForm, Field, getFormSubmitErrors,getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment'
import { Form, Icon,Button,Input,Grid } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import DateCustom from './DateCustom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import {semanticInputField} from '../ui/semanticFormFields/semanticInputFields'
//import Logger from '../../loggingUtil/logger'
//import {semanticInputField, semanticCheckbox} from '../ui/semanticFormFields'
import * as FIELDS from '../ui/semanticFormFields'
import * as FIELDS2 from '../ui/fields'
import Logger from 'logger';


const logger = Logger('SignUpForm');



const renderSelect =  ({ input:{value,onChange,...input}, 
  meta: { touched, error, warning }, as: As = Input, ...props }) => (
  <Form.Select
   {...input}
   {...props}
    onChange={(e, { value }) => onChange(value)}
   
    value={value}
  />
);
const required = value => (value ? undefined : 'Required');

const renderDatePicker1 = ({input, placeholder, defaultValue, meta: {touched, error}}) => (
  <div>
    <DatePicker {...input} dateForm='MM/DD/YYYY' selected={input.value ? moment(input.value) : null}
     />
    
  </div>
);

const renderDatePicker = ({input,label,  defaultValue, meta: {touched, error},...rest}) => {
  logger.log('renderDatePicker',rest)
  return (
    <div>
    <label style={{fontStyle:'bold'}}>{label}</label>
      <DatePicker {...rest}
      selected={input.value ? moment(input.value).toDate() : null}
          onChange={input.onChange}
      />
      </div>
  )
}

const renderDatePicker_working = (props) => {
  return (
      <DatePicker
          selected={props.input.value || null}
          onChange={props.input.onChange}
      />
  )
}
 
class SignUpForm extends Component {

  state = {
    firstName: 'aa',
    lastName: '',
    dob: '',
    date:''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

submit=(values, dispath)=>{
logger.log('handleSubmit values',values);
logger.log('handleSubmit dispath',dispath);
}

 renderError = () => {
 // logger.log('renderError', this.props)
return (
 
  <span >Error</span>
)
 }

 renderCheckbox = field => (
  <Form.Checkbox
    checked={!!field.input.value}
    name={field.input.name}
    label={field.label}
    onChange={(e, { checked }) => field.input.onChange(checked)}
  />
);

 renderRadio = field => (
  <Form.Radio
    checked={field.input.value === field.radioValue}
    label={field.label}
    name={field.input.name}
    onChange={(e, { checked }) => field.input.onChange(field.radioValue)}
  />
);
 isEmpty=(myObject)=> {
  for(var key in myObject) {
      if (myObject.hasOwnProperty(key)) {
          return false;
      }
  }

  return true;
}

renderRadioError=()=>{
  const {submitErrors,submitFailed} = this.props;
 // console.log('renderRadioError submitFailed', submitFailed)
 // console.log('renderRadioError submitErrors.quantity', submitErrors.quantity)
  if (submitFailed){
    if (!!submitErrors.quantity){
     // console.log('renderRadioError return ', submitErrors.quantity)
      return submitErrors.quantity;
    }
  }

  return false;
}

handleChange = (e, { value }) => this.setState({ value })

handleChange1 = (event, { name, value }) => {
 // console.log('*******handleChange1 event', event)
 // console.log('*******handleChange1 name', name)
  //console.log('*******handleChange1 value', value)
  if (this.state.hasOwnProperty(name)) {
    this.setState({ [name]: value });
  }
}
handleDateChange = (date) => {
  this.props.input.onChange(moment(date))
}
renderDatePicker1=(field)=>{
  logger.log('renderDatepicker field',field)
 // const { input,  ...rest } = this.props
  
  return(
    <DatePicker
   // {...rest}
   
    onChange={(date)=>field.onChange(moment(date))}
    selected={field.value ? moment(field.value) : null}
  />
  )
}

  render() {
   // console.log('render this.props', this.props)
    const { handleSubmit,submitErrors } = this.props
    //console.log('submitErrors',submitErrors);
    //console.log('submitErrors.quantity',submitErrors.quantity);
   // console.log ('isEmpty',this.isEmpty(submitErrors))
    if (!this.isEmpty(submitErrors)){
   // const a =[...submitErrors]
   // console.log('a',a)
    }
    return (
      <div>
     
     
      <Form onSubmit={handleSubmit}>

      
      
      <Field
            component={FIELDS.semanticInput}
            as={Form.Input} 
            validate={required}
            type="text" 
            label="First name"
            name="firstName"
            placeholder="First name"
            
          />

            <Field
            component={renderDatePicker}
           
            label="Date of Bith"
            name="dob"
            placeholderText="Select a date between today and 5 days in the future"
            
          />
           <Field
            component={FIELDS2.dateField}
            validate={required}
            label="Date of Bith"
            name="dob2"
            placeholderText="Select a date between today and 5 days in the future"
            
          />
          
           <Field
            component={FIELDS.semanticCheckbox}
            as={Form.Checkbox} 
         
            label="last name"
            name="lastName"
            type='checkbox'
            bogusprops='bogusValue'
            placeholder="last name"
          />
          <Field
            component={renderSelect}
            label="Gender"
            name="gender"
            options={[
              { key: "m", text: "Male", value: "maleValue" },
              { key: "f", text: "Female", value: "femaleValue" }
            ]}
            placeholder="placeholder Gender"
          />
       

           <Form.Group inline style={{marginBottom:'2px'}}>
          
           <label >Quantity</label>
          

          <Field
           component={FIELDS.semanticRadio}
            as={Form.Radio} 
            label="One"
            name="quantity"
            radioValue={1}
            validate={required}
          />
          <Field

           component={FIELDS.semanticRadio}
            as={Form.Radio}
            label="Two"
            name="quantity"
            radioValue={2}
            validate={required}
           
          />
          <Field
            component={FIELDS.semanticRadio}
            as={Form.Radio}
            label="Three"
            name="quantity"
            radioValue={3}
            validate={required}
          
          />
        
        </Form.Group>
       <Grid.Column>
         <Grid.Row>
        <label style={{color:'#9f3a38'}}>{this.renderRadioError()}</label>
        </Grid.Row>
        </Grid.Column>
        
        <button type="submit">Submit</button>
      </Form>
     {this.renderError()}
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
  
    submitErrors: getFormSyncErrors('SignUpForm')(state),
      initialValues: {
         // firstName: 'rajesh',
          lastName:false,
          dob:'01/01/2019'
          
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
   onSubmit:submit

  })
)(SignUpForm);