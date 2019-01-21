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
class DateField extends React.Component {

 state={
     type:'text'
 }
     
      onFocusHandler=()=>{
          this.setState({type:'date'})
          logger.log('onFocusHandler',this.state)
      }

      onBlurHandler=()=>{
        this.setState({type:'text'})
        logger.log('onFocusHandler',this.state)
    }
    render(){

        const { id, disabled = false, classes,
            input,required, width, fullWidth=false,placeholder = '',
            label, meta: { error, touched } }=this.props;
    
            const displayErrorState = touched && !!error;

        return (
            <div>
              <TextField {...input}
                id={id}
                label={label}
                type={this.state.type}
                 placeholder='yyyy-mm-aa'
               onFocus={this.onFocusHandler} 
               onBlur={this.onBlurHandler} 
                required={required}
                error={displayErrorState}
                placeholder={placeholder}
                margin="normal"
                variant="outlined"
                style={{width}} 
                fullWidth={fullWidth}
                className={classes.textField}
                disabled={disabled}
              //  inputProps={{onFocus:()=>this.type='date'}}
                InputLabelProps={{
                  classes: {
                    root: classes.rootLabel,
                    focused: classes.cssFocused
                  },
                  //shrink: true
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
    }

}

DateField.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateField);

//export default formInput
