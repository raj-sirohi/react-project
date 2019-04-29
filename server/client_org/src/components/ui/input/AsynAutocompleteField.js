import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import AsyncSelect from 'react-select/lib/Async';
import Logger from '../../../loggingUtil/logger';

const logger = Logger('AsynAutocompleteField');


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

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
 // logger.log('TextField props', props);
 //logger.log('props.innerProps', props.innerProps);
  //logger.log('props.selectProps.touched', props.selectProps.touched);
  //logger.log('props.selectProps.error', props.selectProps.error);
  const width =props.selectProps.width;
  const fullWidth=props.selectProps.fullWidth;
  const shrinkVal = (props.isFocused || props.selectProps.value) ? true : false
  
  const label = (props.isFocused || props.selectProps.value) ? props.selectProps.label : props.selectProps.label

  const displayErrorState = props.selectProps.touched && !!props.selectProps.error;
  return (
    <div>
    <TextField 
    style={{width}} 
      fullWidth={fullWidth}
      variant="outlined"
      label={label}
      required={props.selectProps.required}
      error={displayErrorState}
     
      className={props.selectProps.classes.textField}
      
      // {...props.selectProps.textFieldProps}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
         // touched:props.selectProps.touched,

         
         // ...props.selectProps.input1,
          ...props.innerProps,
          classes: {
            root: props.selectProps.classes.cssOutlinedInput,
            focused: props.selectProps.classes.cssFocused,
            notchedOutline: props.selectProps.classes.notchedOutline,
          },
        },
      }
      }
      InputLabelProps={{
        classes: {
          root: props.selectProps.classes.rootLabel,
          focused: props.selectProps.classes.cssFocused,
          shrink: props.selectProps.classes.cssFocused
        },
        shrink: shrinkVal
      }}
    />
    <FormHelperText style={{marginTop:'5px' ,color:'red', display:displayErrorState?'':'none'}} >{props.selectProps.error} </FormHelperText>
    </div>
  );
}

const components = {
  Control
};

class AutocompleteField extends React.Component {

  state = {
    placeholder: ''
};

blurHandlder =(input)=>{
  input.onBlur(input.value);
  this.setState({placeholder:''})
}
  render() {
   // logger.log('props', this.props);
    const { input,classes, width,fullWidth,theme, options,loadOptions,placeholder, meta: { touched, error } } = this.props;
   // logger.log('touched', touched);
    const customStyles = {
      input: styles => {
        return {
          ...styles,
          height: '40px',
        };
      }
    }

   

    return (
      <div >
        <AsyncSelect 
          classes={classes}  // pass classes to textfield which is the component displaying this field
         width={width}
         fullWidth={fullWidth}
          label={this.props.label} // pass label to text field
          required={this.props.required} // pass required to text field
          touched={touched} // pass touched to text field
       //  input1={input} // pass the input property to meta information can be injected
          error={error} // pass error to text field
         // options={options}
         loadOptions={loadOptions}
        // defaultOptions={this.defaultOption}
          styles={customStyles}
          components={components} // pass the component which will display this field
          value= {this.props.input.value} // value={this.state.single}
          
          onChange={(value) => this.props.input.onChange(value)} //onChange={this.handleChange('single')}
        // onBlur={() => {this.props.input.onBlur(this.props.input.value); this.setState({placeholder:''})}}
          onBlur={() => this.blurHandlder(input)}
         //onBlur={()=>this.setState({placeholder:''})}
          onFocus={()=>this.setState({placeholder:'start typing for options...'})}
          //placeholder={this.state.placeholder}
          placeholder={<div className={classes.placeholder}>{this.state.placeholder}</div>} 
          isClearable
        />
      </div>
    );
  }
}

AutocompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AutocompleteField);
