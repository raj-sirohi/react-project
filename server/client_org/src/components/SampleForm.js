import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './surveys/SurveyField';
import FormInput from './ui/form/FormInput';
import validateEmails from '../utils/validateEmails';
import formFields from './surveys/formFields';

// material ui
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';

class SampleForm extends Component{



    renderFields(){


        const f1 =   formFields.map(field=>{

            return (
                <Field
                    key={field.name}
                    component={FormInput}
                    type="text"
                    label={field.label}
                    name={field.name}
                />

            );
        })

        return f1;


    }



    render(){
        return (
<div>

    <form onSubmit={this.props.handleSubmit(values=>console.log('form values',values))}>
        {this.renderFields()}


        <Button variant="raised" type='submit' color="primary" >
            <Icon style={{marginRight:'5px'}}>alarm</Icon>  Hello World
        </Button>

        <Button variant="raised" color="secondary"  onClick={() => { console.log('onClick'); }}>
            secondary
        </Button>
    </form>

</div>


        );


    }
};

export default reduxForm({
    form: 'sampleForm',
    destroyOnUnmount: false
})(SampleForm);
