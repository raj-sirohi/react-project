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
import Logger from '../../../loggingUtil/logger';



const styles = theme => ({
  
    textField: {
       
        height:40,
        marginBottom:'4px'
      },

      rootLabel: {
      //  color : 'green',
         transform: 'translate(14px, 12px) scale(1)',
         
      },
   
    resize:{
        fontSize:10,
        height : '20px',
       
      },

      cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
          borderRadius:0
         
        }
      },
    
      cssFocused: {},
    
      notchedOutline: {
      //  borderWidth: '1px',
        // borderColor: 'green !important',
        borderRadius:0
      },
    
});



const formInput= ({id,disabled=false,required=false,width,classes, type='text',
input,multiline=false,placeholder='',
rows=0, rowsMax=0, label, meta: { error, touched } }) => {
  const logger = Logger('InputField');
  logger.log('props error',error)
const displayErrorState = touched && !!error;


    return (
        <div>
                 <TextField {...input} 
                
          id={id}
          label={label}
          type={type}
          error ={displayErrorState}
          multiline
          rowsMax={rowsMax} 
          rows={rows} 
          style={{width}} 
          placeholder={placeholder} 
          margin="normal"
          variant="outlined"
         
         disabled={disabled}
         required={required}
        
        />
               
               <FormHelperText style={{marginTop:0 ,color:'red', display:displayErrorState?'':'none'}} id={id+'helpertext'}>{error} </FormHelperText>
        </div>


    );
};


formInput.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(formInput);

//export default formInput
