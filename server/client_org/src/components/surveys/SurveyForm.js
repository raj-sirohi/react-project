// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

 fields = [
        { label: 'Campaign Title', name: 'title' },
        { label: 'Subject Line', name: 'subject' },
        { label: 'Email Body', name: 'body' },
        { label: 'Recipient List', name: 'recipients' }
        ];

    renderFields(){

      //  const test =[1,2,3]
        console.log('BEFORE');
       console.log(formFields);
        console.log('AFTER');

     const f1 =   formFields.map(field=>{

            return (
                <Field
                    key={field.name}
                    component={SurveyField}
                    type="text"
                    label={field.label}
                    name={field.name}
                />

            );
        })

return f1;


    }

    renderFields2(){
        return (
            <Field
                key='title'
                component='input'
                type="text"
                label='title'
                name='title'
            />
        );
    }

    render() {
       // console.log(this.renderFields());
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSubmitSurveyAction)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="btn waves-effect waves-teal right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

   // errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
