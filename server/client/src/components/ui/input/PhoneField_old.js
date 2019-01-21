import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import AsyncSelect from 'react-select/lib/Async';
import InputMask from 'react-input-mask';
import Grid from '@material-ui/core/Grid';
import { reduxForm, Field, getFormSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Actions from '../../../store/actions/countryActions'
import AsynAutocompleteField from './AsynAutocompleteField'
import FormatMaskField from './FormatMaskField'
import Logger from '../../../loggingUtil/logger';

const styles = theme => ({
    textField: {
      height: 40,        // for autocomplete, text field and react-select should be same
      // text field is displayed from react-select
      marginTop: '15px'
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    rootLabel: {
      transform: 'translate(14px, 12px) scale(1)',
      
    //  opacity:'0'
    },
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: `${theme.palette.primary.secondary} !important`,
        opacity:'100'
      }
    },
    cssFocused: {
     // opacity:'100'
    },
  
    notchedOutline: {
     // opacity:'100'
    },
  
    placeholder:{
      color:'#a2a2a2'
    }
  });

class PhoneField extends React.Component {
    logger = Logger('PhoneField');
    state = {
        placeholder: ''
    };

    loadOptions = async (inputValue, callback) => {
       
        const resp = await this.props.getCountryListByName(inputValue);
        //axios.get('/country/' + inputValue);
        
        callback(this.populateOptions(resp));
    };

   
    populateOptions(data) {
       
        if (data) {
            var newArray = data.map((value) => {
                return { label: value.country, value: value.value, code: value.code };
            })
        }
        this.logger.log('newArray', newArray)
        return newArray; 
    };

    render() {
        this.logger.log('this.props', this.props);
        const { classes, width,fullWidth,theme, name,label} = this.props;
        const autocompleteName = name+'-country'
        const phoneMaskName = name +'-phoneMask';
        const autocompleteLabel=label;
        const phoneMaskLabel = 'Phone Number'
        return (
           
            <Grid container>
                <Grid item xs={6}>
                <Field
                        width='80%'
                        
                        component={AsynAutocompleteField}
                        loadOptions={this.loadOptions}
                        label={autocompleteLabel}
                        
                        name={autocompleteName} />
                </Grid>
                <Grid item xs={6}>
                <Field
                        width='80%'
                       // disabled={true}
                        component={FormatMaskField}
                        label='Phone Number'
                        
                        name={phoneMaskName} />
                </Grid>
            </Grid>
           
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
    
        getCountryListByName: (inputVal) => dispatch(Actions.getCountryListByName(inputVal))

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

//export default withStyles(styles, { withTheme: true })(PhoneField);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
   
)(withStyles(styles)(PhoneField));
