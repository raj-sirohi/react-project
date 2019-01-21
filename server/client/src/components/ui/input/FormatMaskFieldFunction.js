import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputMask from 'react-input-mask';

import Logger from '../../../loggingUtil/logger';

const logger= Logger('FormatMastField');

const styles = theme => ({
  
    textField: {
       
        height:40,
        marginBottom:'4px'
      },

      rootLabel: {
       // color : 'green',
         transform: 'translate(14px, 12px) scale(1)',
         
      },
   
    resize:{
        fontSize:10,
        height : '20px',
       
      },

      cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
         // borderRadius:0
         
        }
      },
    
      cssFocused: {},
    
      notchedOutline: {
      //  borderWidth: '1px',
        // borderColor: 'green !important',
      //  borderRadius:0
      },
    
});



const formInput= ({input,mask ,id,disabled=false,required=false,width,fullWidth=false,classes, type='text',
multiline=false,placeholder='',
rows=0, rowsMax=0, label, meta: { error, touched } }) => {
  logger.log('touched', touched);
const displayErrorState = touched && !!error;



    return (
      <div>
        <InputMask  {...input}
        width='20%'
       // mask="999-999-9999"
        mask={mask}
        maskChar=" "
        disabled={disabled}
       // value='12345'
       // value={this.state.phone}
       // onChange={this.onChange}
       // value={input.value} // value={this.state.single}
        onChange={(value) => input.onChange(value)}
      >
        {() => <TextField   disabled={disabled}   margin="normal" required={required}
         variant="outlined" label ={label} error={displayErrorState}
         style={{width}} 
         fullWidth={fullWidth}
          className={classes.textField}   InputLabelProps={{
            classes: {
              root: classes.rootLabel,
            //  focused: classes.cssFocused
            
            },
           // shrink: true
          }}  />}
      </InputMask>
      <FormHelperText style={{marginTop:'5px' ,color:'red', display:displayErrorState?'':'none'}} >{error} </FormHelperText>
</div>

    );
};


formInput.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(formInput);

//export default formInput
