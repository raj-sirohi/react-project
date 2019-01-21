import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Logger from '../../../loggingUtil/logger';

const logger = Logger('DateField');

const styles = theme => ({
  textField: {
    height: 40,
    marginBottom: '4px'
  },
  rootLabel: {
    //  color : 'green',
    transform: 'translate(14px, 12px) scale(1)',
  },
  resize: {
    fontSize: 10,
    height: '20px',
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
     // borderRadius: 0
    }
  },
  cssFocused: {},
  notchedOutline: {
    //  borderWidth: '1px',
    // borderColor: 'green !important',
   // borderRadius: 0
  },
});

const formInput = ({ id, disabled = false, classes,
  input,required, width, fullWidth=false,placeholder = '',
  label, meta: { error, touched } }) => {
  const displayErrorState = touched && !!error;

  return (
    <div>
      <TextField {...input}
        id={id}
        label={label}
        type='date'
         placeholder=''
       // onFocus={(e)=>{this.type='date';logger.log('******onFocus e',this)}} onBlur={()=>this.type='date'}
        required={required}
        error={displayErrorState}
        placeholder={placeholder}
        margin="normal"
        variant="outlined"
        style={{width}} 
        fullWidth={fullWidth}
        className={classes.textField}
        disabled={disabled}
        //inputProps={{onFocus:()=>this.type='date'}}
          
       
        InputLabelProps={{
          classes: {
            root: classes.rootLabel,
            focused: classes.cssFocused
          },
          shrink: true
        }}

        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
      />
      <FormHelperText style={{ marginTop: 0, color: 'red', display: displayErrorState ? '' : 'none' }} id={id + 'helpertext'}>{error} </FormHelperText>
    </div>
  );
};

formInput.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(formInput);

//export default formInput
