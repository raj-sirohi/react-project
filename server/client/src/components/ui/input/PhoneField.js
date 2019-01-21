import React from 'react';
//import { ReactDOM,findDOMNode } from "react-dom";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import * as Actions from '../../../store/actions/countryActions'
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import AsyncSelect from 'react-select/lib/Async';
import { reduxForm,initialize, change, Field, getFormSubmitErrors } from 'redux-form';
import AsynAutocompleteField from './AsynAutocompleteField'
import FormatMaskField from './FormatMaskField'
import {getFormatMask} from '../../../validator/phoneValidator'
import Logger from '../../../loggingUtil/logger';

const logger = Logger('PhoneField1');


const styles = theme => ({

});


class PhoneField extends React.Component {
  
  state = {
    placeholder: '',
    hasCountryValue:false,
    countryFieldName: '',
    phoneFieldName: '',
    phoneDisabled: true,
    mask: '999-999-9999',

  };

  componentDidMount() {
    const { input } = this.props;
    const name = input.name;
    this.setState({ countryFieldName: `country-${name}`, phoneFieldName: `phone-${name}` })
  }

  loadOptions = async (inputValue, callback) => {
    const resp = await this.props.getCountryListByName(inputValue);
    callback(this.populateOptions(resp));
  };

  populateOptions(data) {
    let newArray;
    if (data) {
      newArray = data.map((value) => {
        return { label: value.country, value: value.value, code: value.code };
      })
    }
    return newArray;
  };
  required = value => value ? undefined : 'Country is Required'

  validatePhoneNumber =value=>{
    const isPhoneEnabled = !this.state.phoneDisabled
    if (isPhoneEnabled){
      if (!!!value)
      return 'Phone number is required';
    }
  }
 
  onCountryChangeHandler = (value) => {
    const { meta: { form } } = this.props;
    this.props.updateField(form, this.state.phoneFieldName, null);

    if (!!value.value) {
      const formatMask = getFormatMask(value.code);
      this.setState({ phoneDisabled: false,hasCountryValue:true,mask:formatMask });
    } else {
      this.setState({ hasCountryValue:false,mask:'999'});
    }
  }

  onBlurHandler =(value)=>{
    if (!this.state.hasCountryValue && !this.state.phoneDisabled){
       this.setState({ phoneDisabled: true })
     }
  }

  componentDidUpdate(){
    if (!this.state.phoneDisabled){
      ReactDOM.findDOMNode(this.title).getElementsByTagName("input")[0].focus()
    }
  }

  render() {
    const { classes, input, required, label, width, fullWidth, theme, options, loadOptions, placeholder, meta: { touched, error } } = this.props;
    const name = input.name;

    return (
      <Grid container>
        <Grid item xs={6}>
          <Field
            width='95%'
            required={required}
            validate={[this.required]}
            component={AsynAutocompleteField}
            onChange={(value) => this.onCountryChangeHandler(value)}
            loadOptions={this.loadOptions}
            label='Phone Country'
            name={this.state.countryFieldName} />
        </Grid>
        <Grid item xs={6}>
          <Field
            width='95%'
            id = 'title'
            required = {!this.state.phoneDisabled}
            disabled={this.state.phoneDisabled}
            component={FormatMaskField}
            mask={this.state.mask}
            label={label}
            ref={(input) => { this.title = input; }}
            onBlur={(value) => this.onBlurHandler(value)}
             validate ={[this.validatePhoneNumber]}
            name={this.state.phoneFieldName} />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateField: (formName, field, data) => dispatch(change(formName, field, data)),
    getCountryListByName: (inputVal) => dispatch(Actions.getCountryListByName(inputVal)),
    initialize :(formName,fieldArray,keepDirty) => dispatch(initialize(formName,fieldArray,keepDirty))

  }
}

const mapStateToProps = state => {
  return {
    countryList: state.country.countryList
  }
}

PhoneField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(withStyles(styles)(PhoneField));
